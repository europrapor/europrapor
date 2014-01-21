from settings import DB_HOST, DB_NAME, DB_USER
import torndb


class Database(object):

    _connection = None

    @classmethod
    def get_connection(cls):
        if not cls._connection:
            cls._connection = torndb.Connection(DB_HOST, DB_NAME, DB_USER)
        return cls._connection
