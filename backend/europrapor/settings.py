# Global settings
DEBUG_MODE = True

# Web application network settings
HTTP_ADDR = '127.0.0.1'
HTTP_PORT = '8000'
HTTP_WORKERS = 0  # Set to 0 to automaticaly detect cores count.

# Database settings
DB_HOST = '127.0.0.1'
DB_NAME = 'europrapor'
DB_USER = 'root'

# Map search settings
SELECT_RADIUS = 0.00015  # ~15 meters.
SELECT_TIMESPAN = '04:00:00'  # Last 4 hours.
