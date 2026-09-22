# YRShop AI Django

A multilingual e-commerce platform built with Django, PostgreSQL, Django REST Framework, and a responsive web interface. YRShop provides product discovery, seller and customer accounts, shopping workflows, order management, product reviews, and buyer–seller messaging.

## Features

- **Product catalog** with multilingual product names and descriptions in English, French, and Arabic
- **Product management** with categories, collections, images, colors, sizes, stock quantities, sales, and pricing
- **Authentication and profiles** using Django authentication with email-based login support
- **Shopping and orders** with order creation, inventory updates, transaction references, and delivery-status tracking
- **Seller workflows** through seller sales records and order logistics states
- **Ratings and reviews** with star ratings, comments, seller responses, and aggregated review statistics
- **Buyer–seller chat** with product-specific chat rooms and messages
- **REST API support** with pagination and filtering through Django REST Framework
- **Media and static assets** for product images, category icons, collections, CSS, and JavaScript
- **Administrative tools** provided by Django Admin and `django-import-export`

## Technology Stack

- **Backend:** Python, Django 3.2
- **API:** Django REST Framework, `django-filter`
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS/SCSS, JavaScript, Django Templates
- **Media processing:** Pillow
- **Deployment support:** Gunicorn
- **Cross-origin requests:** `django-cors-headers`

## Project Structure

```text
.
├── account/       # Authentication, user profiles, and account-related functionality
├── chat/          # Buyer–seller chat rooms and messages
├── media/         # Uploaded product and user media
├── orders/        # Orders, seller sales, and logistics tracking
├── project/       # Django project configuration, settings, and URL routing
├── static/        # Static CSS, JavaScript, and frontend assets
├── store/         # Products, categories, collections, reviews, and catalog logic
├── templates/     # Django HTML templates
├── manage.py      # Django management entry point
└── requirements.txt
```

## Requirements

- Python 3.8 or newer
- PostgreSQL 12 or newer
- `pip` and `venv`
- Node.js/npm if you plan to compile or modify frontend assets

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yassinerahhaui/yrshop_ai_django.git
cd yrshop_ai_django
```

### 2. Create and activate a virtual environment

**macOS/Linux:**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Windows PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3. Install Python dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Configure PostgreSQL

Create a PostgreSQL database and application user, then configure the connection through environment variables or your local Django settings.

For local development, the project currently expects PostgreSQL and uses the following database settings by default:

```text
Database: ecom2
User:     postgres
Host:     127.0.0.1
Port:     5432
```

Do not commit database passwords, email credentials, Django secret keys, or other sensitive values to source control. For a production deployment, move these settings into environment variables and rotate any credentials that may have been exposed.

### 5. Apply migrations

```bash
python manage.py migrate
```

### 6. Create an administrator account

```bash
python manage.py createsuperuser
```

### 7. Start the development server

```bash
python manage.py runserver
```

The application will be available at:

- Storefront: <http://127.0.0.1:8000/>
- Admin panel: <http://127.0.0.1:8000/admin/>
- Authentication: <http://127.0.0.1:8000/accounts/>
- Chat: <http://127.0.0.1:8000/chat/>
- Orders: <http://127.0.0.1:8000/orders/>

## Configuration

Before deploying, review and configure the following settings in `project/settings.py` or, preferably, through environment variables:

- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`
- PostgreSQL database credentials
- `CORS_ALLOWED_ORIGINS`
- Email SMTP credentials
- Static and media storage settings

For production, also run:

```bash
python manage.py collectstatic
python manage.py check --deploy
```

A typical WSGI process can be started with Gunicorn using:

```bash
gunicorn project.wsgi:application
```

## Application Routes

| Area | URL |
|---|---|
| Storefront | `/` |
| Authentication | `/accounts/` |
| Admin | `/admin/` |
| Chat | `/chat/` |
| Orders | `/orders/` |

The exact available pages and API endpoints are defined in the URL configuration for each Django application.

## Data Model Overview

The main domain models include:

- `Product`, `ProductSize`, `ProductColor`, and `ProductImage` for catalog and inventory management
- `CategoryParent`, `CategoryChild`, and `Collection` for product organization
- `ProductRatting` and `ReviewsResultInfo` for reviews and rating aggregates
- `Order` and `UserSales` for checkout and seller fulfillment workflows
- `ChatRoom` and `Message` for buyer–seller communication

## Development Guidelines

1. Create a feature branch from `main`.
2. Keep secrets and local database files out of Git.
3. Run migrations after model changes:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Run the Django system checks before opening a pull request:

   ```bash
   python manage.py check
   ```

5. Add or update tests when changing business logic, inventory behavior, authentication, orders, or reviews.

## Security Notes

The repository is configured for local development. Before using it in production:

- Set `DEBUG = False`.
- Replace the Django secret key with a secure environment variable.
- Configure `ALLOWED_HOSTS` explicitly.
- Use secure, rotated database and SMTP credentials.
- Configure HTTPS, secure cookies, CSRF trusted origins, and production static/media storage.
- Review uploaded-file handling and permissions.
- Run `python manage.py check --deploy` and address all reported warnings.

## Contributing

Contributions are welcome. Please open an issue to discuss a significant change before submitting a pull request. Pull requests should include a clear description, relevant screenshots for UI changes, migration notes when applicable, and tests or verification steps.

## License

No license is currently specified for this repository. Until a license is added, the project should be treated as **all rights reserved**.

## Repository

[View YRShop AI Django on GitHub](https://github.com/yassinerahhaui/yrshop_ai_django)
