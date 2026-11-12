
-- ========================================
-- Service Connect Database Setup
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- Insert sample organizations

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


-- ========================================
-- CREATE SERVICE PROJECT TABLE
-- ========================================

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- ========================================
--  INSERT SAMPLE SERVICE PROJECTS
-- ========================================

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES

-- BrightFuture Builders (Organization 1)

(
    1,
    'Community Park Renovation',
    'Help renovate a local park by repairing benches, painting structures, and improving outdoor spaces.',
    'Kingston',
    '2026-12-05'
),
(
    1,
    'School Building Improvement',
    'Assist with improving classroom spaces and repairing school facilities.',
    'Spanish Town',
    '2026-12-12'
),
(
    1,
    'Community Playground Project',
    'Help construct and improve safe playground facilities for children.',
    'Portmore',
    '2026-12-19'
),
(
    1,
    'Neighborhood Cleanup',
    'Work with volunteers to clean public spaces and improve the local environment.',
    'Kingston',
    '2027-01-09'
),
(
    1,
    'Community Center Painting',
    'Help repaint and improve a community center used for local programs.',
    'May Pen',
    '2027-01-16'
),

-- GreenHarvest Growers (Organization 2)

(
    2,
    'Community Garden Planting',
    'Help prepare garden beds and plant vegetables for a community food garden.',
    'Kingston',
    '2026-12-06'
),
(
    2,
    'Urban Farming Workshop',
    'Assist with teaching residents basic urban farming and sustainable gardening skills.',
    'Spanish Town',
    '2026-12-13'
),
(
    2,
    'Community Composting Day',
    'Help collect organic waste and prepare compost for community gardens.',
    'Portmore',
    '2026-12-20'
),
(
    2,
    'Vegetable Harvest Program',
    'Help harvest and distribute fresh vegetables to local families.',
    'Kingston',
    '2027-01-10'
),
(
    2,
    'School Garden Development',
    'Help students establish a vegetable garden at a local school.',
    'May Pen',
    '2027-01-17'
),

-- UnityServe Volunteers (Organization 3)

(
    3,
    'Food Donation Drive',
    'Collect and organize food donations for families in need.',
    'Kingston',
    '2026-12-07'
),
(
    3,
    'Elderly Community Support',
    'Assist elderly residents with household tasks and community support activities.',
    'Spanish Town',
    '2026-12-14'
),
(
    3,
    'Youth Mentorship Program',
    'Support young people through educational activities and mentorship.',
    'Portmore',
    '2026-12-21'
),
(
    3,
    'Community Clothing Drive',
    'Collect, sort, and distribute clothing donations to families.',
    'Kingston',
    '2027-01-11'
),
(
    3,
    'Neighborhood Volunteer Day',
    'Coordinate volunteers to assist with community improvement activities.',
    'May Pen',
    '2027-01-18'
);

-- ========================================
-- VERIFY DATABASE RECORDS
-- ========================================

SELECT * FROM organization;

SELECT * FROM service_project;

-- ========================================
-- VERIFY PROJECTS AND ORGANIZATIONS
-- ========================================

SELECT
    p.project_id,
    p.title,
    o.name AS organization_name,
    p.location,
    p.project_date
FROM service_project p
JOIN organization o
    ON p.organization_id = o.organization_id
ORDER BY p.project_id;
