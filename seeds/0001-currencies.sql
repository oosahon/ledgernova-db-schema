INSERT INTO core.currencies
    (code, symbol, name, minor_unit, created_at, updated_at)
VALUES 
    ('USD', '$', 'US Dollar', 2, NOW(), NOW()),
    ('EUR', '€', 'Euro', 2, NOW(), NOW()),
    ('GBP', '£', 'British Pound', 2, NOW(), NOW()),
    ('NGN', '₦', 'Nigerian Naira', 2, NOW(), NOW());