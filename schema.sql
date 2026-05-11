/**
 * SQL Schema for School Management API
 * 
 * This file contains all the SQL queries needed to set up the database
 * Execute these queries in MySQL to initialize the database structure
 */

-- ============================================
-- CREATE DATABASE
-- ============================================

/**
 * Create the main database for school management
 * CHARACTER SET utf8mb4 allows support for emoji and special characters
 * COLLATE utf8mb4_unicode_ci provides case-insensitive comparison
 */
CREATE DATABASE IF NOT EXISTS school_management
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Select the database to use
USE school_management;

-- ============================================
-- SCHOOLS TABLE
-- ============================================

/**
 * Schools Table
 * 
 * This table stores information about different schools
 * 
 * Fields:
 * - id: Unique identifier for each school (Primary Key)
 * - name: Name of the school
 * - address: Physical address of the school
 * - latitude: Geographic latitude coordinate
 * - longitude: Geographic longitude coordinate
 * - created_at: Timestamp when record was created
 * - updated_at: Timestamp when record was last updated
 */
CREATE TABLE IF NOT EXISTS schools (
  -- Primary key - auto-incrementing unique identifier
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- School name (required, maximum 255 characters)
  name VARCHAR(255) NOT NULL,
  
  -- School address (required, maximum 500 characters)
  address VARCHAR(500) NOT NULL,
  
  -- Latitude coordinate for location (decimal with 8 decimal places)
  latitude FLOAT(10, 8),
  
  -- Longitude coordinate for location (decimal with 8 decimal places)
  longitude FLOAT(11, 8),
  
  -- Automatically set to current timestamp when record is created
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Automatically updated to current timestamp on any update
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Create index on school name for faster searches
  INDEX idx_school_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STUDENTS TABLE
-- ============================================

/**
 * Students Table
 * 
 * This table stores information about students
 * Each student belongs to a school
 */
CREATE TABLE IF NOT EXISTS students (
  -- Primary key - auto-incrementing unique identifier
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- Foreign key to schools table (optional for now)
  school_id INT,
  
  -- Student full name (required)
  name VARCHAR(100) NOT NULL,
  
  -- Student email (required, must be unique)
  email VARCHAR(100) UNIQUE NOT NULL,
  
  -- Student phone number (optional)
  phone VARCHAR(15),
  
  -- Student grade/class (optional)
  grade VARCHAR(10),
  
  -- Student age (optional)
  age INT,
  
  -- Timestamp when record was created
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Timestamp when record was last updated
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Create indexes for faster searches
  INDEX idx_student_email (email),
  INDEX idx_student_grade (grade),
  INDEX idx_school_id (school_id),
  
  -- Foreign key constraint to schools table
  CONSTRAINT fk_students_school 
    FOREIGN KEY (school_id) 
    REFERENCES schools(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERT SAMPLE DATA (Optional)
-- ============================================

/**
 * Sample data for testing
 * Uncomment these queries to insert test data into the database
 */

-- Insert sample school
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Central High School', '123 Main Street, Downtown', 40.7128, -74.0060);

-- Insert sample students
INSERT INTO students (name, email, phone, grade, age, school_id) VALUES
('John Doe', 'john.doe@example.com', '1234567890', '10A', 15, 1),
('Jane Smith', 'jane.smith@example.com', '0987654321', '10B', 15, 1),
('Michael Johnson', 'michael.johnson@example.com', '5555555555', '11A', 16, 1);

-- ============================================
-- VIEW TABLES (Testing)
-- ============================================

-- View all schools
SELECT * FROM schools;

-- View all students
SELECT * FROM students;

-- View students with their school information
SELECT 
  s.id,
  s.name,
  s.email,
  s.grade,
  s.age,
  sch.name AS school_name,
  sch.address
FROM students s
LEFT JOIN schools sch ON s.school_id = sch.id;
