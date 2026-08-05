BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_post_like UNIQUE (post_id, user_id)
);

-- Seed users

INSERT INTO users (
    id,
    username,
    email,
    avatar_url
)
VALUES
    (
        '10000000-0000-0000-0000-000000000001',
        'amirali',
        'amirali@example.com',
        NULL
    ),
    (
        '10000000-0000-0000-0000-000000000002',
        'sarah',
        'sarah@example.com',
        NULL
    ),
    (
        '10000000-0000-0000-0000-000000000003',
        'alex',
        'alex@example.com',
        NULL
    )
ON CONFLICT DO NOTHING;

-- Seed posts

INSERT INTO posts (
    id,
    user_id,
    title,
    description,
    image_url,
    created_at
)
VALUES
    (
        '20000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000001',
        'Morning hike',
        'A great way to start the weekend.',
        'https://images.unsplash.com/photo-1551632811-561732d1e306',
        NOW() - INTERVAL '5 days'
    ),
    (
        '20000000-0000-0000-0000-000000000002',
        '10000000-0000-0000-0000-000000000002',
        'Coffee break',
        'Trying a new coffee shop downtown.',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        NOW() - INTERVAL '4 days'
    ),
    (
        '20000000-0000-0000-0000-000000000003',
        '10000000-0000-0000-0000-000000000003',
        'City at night',
        'The view looked amazing tonight.',
        'https://images.unsplash.com/photo-1519608487953-e999c86e7455',
        NOW() - INTERVAL '3 days'
    ),
    (
        '20000000-0000-0000-0000-000000000004',
        '10000000-0000-0000-0000-000000000001',
        'Weekend workout',
        'Finished another CrossFit session.',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        NOW() - INTERVAL '2 days'
    ),
    (
        '20000000-0000-0000-0000-000000000005',
        '10000000-0000-0000-0000-000000000002',
        'Beach day',
        'A quiet afternoon by the water.',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        NOW() - INTERVAL '1 day'
    )
ON CONFLICT DO NOTHING;

-- Seed comments

INSERT INTO comments (
    id,
    post_id,
    user_id,
    comment,
    created_at
)
VALUES
    (
        '30000000-0000-0000-0000-000000000001',
        '20000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000002',
        'That view looks amazing!',
        NOW() - INTERVAL '4 days'
    ),
    (
        '30000000-0000-0000-0000-000000000002',
        '20000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000003',
        'Where is this?',
        NOW() - INTERVAL '4 days'
    ),
    (
        '30000000-0000-0000-0000-000000000003',
        '20000000-0000-0000-0000-000000000002',
        '10000000-0000-0000-0000-000000000001',
        'I need to try this place.',
        NOW() - INTERVAL '3 days'
    ),
    (
        '30000000-0000-0000-0000-000000000004',
        '20000000-0000-0000-0000-000000000004',
        '10000000-0000-0000-0000-000000000003',
        'Great work!',
        NOW() - INTERVAL '1 day'
    ),
    (
        '30000000-0000-0000-0000-000000000005',
        '20000000-0000-0000-0000-000000000005',
        '10000000-0000-0000-0000-000000000001',
        'Perfect weather for it.',
        NOW()
    )
ON CONFLICT DO NOTHING;

-- Seed likes

INSERT INTO likes (
    post_id,
    user_id,
    created_at
)
VALUES
    (
        '20000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000002',
        NOW() - INTERVAL '4 days'
    ),
    (
        '20000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000003',
        NOW() - INTERVAL '4 days'
    ),
    (
        '20000000-0000-0000-0000-000000000002',
        '10000000-0000-0000-0000-000000000001',
        NOW() - INTERVAL '3 days'
    ),
    (
        '20000000-0000-0000-0000-000000000003',
        '10000000-0000-0000-0000-000000000001',
        NOW() - INTERVAL '2 days'
    ),
    (
        '20000000-0000-0000-0000-000000000004',
        '10000000-0000-0000-0000-000000000002',
        NOW() - INTERVAL '1 day'
    ),
    (
        '20000000-0000-0000-0000-000000000005',
        '10000000-0000-0000-0000-000000000001',
        NOW()
    ),
    (
        '20000000-0000-0000-0000-000000000005',
        '10000000-0000-0000-0000-000000000003',
        NOW()
    )
ON CONFLICT (post_id, user_id) DO NOTHING;

COMMIT;