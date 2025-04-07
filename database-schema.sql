-- Database Schema for IIITN Backlog Management System


CREATE TABLE branches (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(50) NOT NULL,
    branch_code VARCHAR(10) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert branch data
INSERT INTO branches (branch_name, branch_code, department) VALUES
('CSE Core', 'CSE', 'Computer Science & Engineering'),
('CS AI/ML', 'CSAI', 'Computer Science & Engineering'),
('CS Data Science', 'CSDS', 'Computer Science & Engineering'),
('CS-HCIGT', 'CSHCI', 'Computer Science & Engineering'),
('ECE Core', 'ECE', 'Electronics & Communication Engineering'),
('ECE-IoT', 'ECEIOT', 'Electronics & Communication Engineering');

-- Batches Table
CREATE TABLE batches (
    batch_id INT PRIMARY KEY AUTO_INCREMENT,
    batch_year INT NOT NULL,
    batch_name VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (batch_year, batch_name)
);

-- Insert batch data
INSERT INTO batches (batch_year, batch_name) VALUES
(2020, 'BT20'),
(2021, 'BT21'),
(2022, 'BT22'),
(2023, 'BT23');

-- Students Table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    roll_number VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    branch_id INT NOT NULL,
    batch_id INT NOT NULL,
    current_semester INT NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (batch_id) REFERENCES batches(batch_id)
);

-- Subjects Table
CREATE TABLE subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_code VARCHAR(10) NOT NULL UNIQUE,
    subject_name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    branch_id INT NOT NULL,
    semester INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

-- Batch Subject Mapping (which subjects are offered to which batch)
CREATE TABLE batch_subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT NOT NULL,
    subject_id INT NOT NULL,
    academic_year VARCHAR(9) NOT NULL, -- e.g., "2023-2024"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES batches(batch_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    UNIQUE KEY (batch_id, subject_id, academic_year)
);

-- Backlog Records Table
CREATE TABLE backlogs (
    backlog_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    semester INT NOT NULL,
    reason VARCHAR(255),
    status ENUM('pending', 'cleared', 'failed') DEFAULT 'pending',
    exam_date DATE,
    marks FLOAT,
    created_by INT NOT NULL, -- Admin who created the record
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    UNIQUE KEY (student_id, subject_id, academic_year)
);

-- Admin Users Table
CREATE TABLE admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('super_admin', 'admin', 'faculty') NOT NULL DEFAULT 'faculty',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Backlog Exam Schedule
CREATE TABLE backlog_exams (
    exam_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_id INT NOT NULL,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    venue VARCHAR(100) NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (created_by) REFERENCES admins(admin_id)
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    recipient_type ENUM('student', 'admin', 'all') NOT NULL,
    recipient_id INT, -- NULL if for all
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES students(student_id) ON DELETE CASCADE
);

-- Audit Log Table
CREATE TABLE audit_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_type ENUM('admin', 'student') NOT NULL,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample queries for common operations

-- 1. Get all backlogs for a specific student
SELECT b.backlog_id, s.subject_code, s.subject_name, b.semester, b.status, b.exam_date
FROM backlogs b
JOIN subjects s ON b.subject_id = s.subject_id
WHERE b.student_id = 1;

-- 2. Get backlog statistics by branch
SELECT br.branch_name, COUNT(b.backlog_id) as total_backlogs
FROM backlogs b
JOIN students st ON b.student_id = st.student_id
JOIN branches br ON st.branch_id = br.branch_id
WHERE b.status = 'pending'
GROUP BY br.branch_id;

-- 3. Get subjects with most backlogs
SELECT s.subject_code, s.subject_name, COUNT(b.backlog_id) as backlog_count
FROM subjects s
JOIN backlogs b ON s.subject_id = b.subject_id
GROUP BY s.subject_id
ORDER BY backlog_count DESC
LIMIT 10;

-- 4. Get upcoming backlog exams
SELECT s.subject_code, s.subject_name, be.exam_date, be.venue
FROM backlog_exams be
JOIN subjects s ON be.subject_id = s.subject_id
WHERE be.exam_date >= CURDATE()
ORDER BY be.exam_date;

-- 5. Get students with most backlogs
SELECT st.roll_number, CONCAT(st.first_name, ' ', st.last_name) as student_name, 
       br.branch_name, COUNT(b.backlog_id) as backlog_count
FROM students st
JOIN backlogs b ON st.student_id = b.student_id
JOIN branches br ON st.branch_id = br.branch_id
WHERE b.status = 'pending'
GROUP BY st.student_id
ORDER BY backlog_count DESC
LIMIT 10;

