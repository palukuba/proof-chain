-- ProofChain Sample Data
-- Execute this AFTER running schema.sql

-- Insert default app settings (only if table is empty)
INSERT INTO app_settings (auto_mint, email_notifications, cardano_network, ipfs_gateway)
SELECT FALSE, TRUE, 'preprod', 'https://ipfs.io/ipfs/'
WHERE NOT EXISTS (SELECT 1 FROM app_settings LIMIT 1);

-- Insert default school profile (only if table is empty)
INSERT INTO school_profile (name, website, email, address, issuer_did)
SELECT 'My Institution', '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM school_profile LIMIT 1);

-- Sample students data (optional - for testing)
INSERT INTO students (student_id, first_name, last_name, email, program, graduation_year)
VALUES
  ('STU001', 'Marie', 'Kabila', 'marie.kabila@example.com', 'Computer Science', 2024),
  ('STU002', 'Jean', 'Mukendi', 'jean.mukendi@example.com', 'Business Administration', 2024),
  ('STU003', 'Grace', 'Mwamba', 'grace.mwamba@example.com', 'Engineering', 2025)
ON CONFLICT (student_id) DO NOTHING;

-- Sample documents (optional - for testing)
INSERT INTO documents (title, student_id, student_name, issue_date, status, description)
VALUES
  ('Diploma - Computer Science', 'STU001', 'Marie Kabila', '2024-06-15', 'MINTED', 'Bachelor Degree in Computer Science'),
  ('Certificate - Excellence', 'STU001', 'Marie Kabila', '2024-06-15', 'DRAFT', 'Certificate of Academic Excellence'),
  ('Diploma - Business', 'STU002', 'Jean Mukendi', '2024-06-15', 'DRAFT', 'Bachelor Degree in Business Administration')
ON CONFLICT DO NOTHING;
