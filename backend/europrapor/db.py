from settings import DB_HOST, DB_NAME, DB_USER
import torndb


class Database(object):

    @classmethod
    def get_connection(cls):
        return torndb.Connection(DB_HOST, DB_NAME, DB_USER)
