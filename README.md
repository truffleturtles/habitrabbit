# HabitRabbit 🐰

A social habit tracking application that combines friend support and financial incentives to help users build better habits.

## Features

- Social Support System
  - Group challenges with 1-10 friends
  - Real-time notifications and encouragement
  - Progress tracking and sharing
  - Customizable habit frequencies

- Financial Incentives
  - Venmo integration for pledges
  - Automated payout system
  - Performance-based rewards
  - Transparent tracking of commitments

## Tech Stack

- Backend: FastAPI (Python 3.9+)
- Frontend: React with TypeScript
- Database: PostgreSQL
- Authentication: JWT
- Payment Processing: Venmo API

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
5. Initialize the database:
   ```bash
   alembic upgrade head
   ```
6. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Project Structure

```
habitrabbit/
├── app/
│   ├── api/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   └── services/
├── frontend/
├── tests/
├── alembic/
└── docs/
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
