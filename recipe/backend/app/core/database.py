from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings


# PostgreSQL (User data, health info)
engine = create_async_engine(settings.POSTGRES_URL, echo=settings.DEBUG)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()


# MongoDB (Recipes, flexible data)
class MongoDB:
    client: AsyncIOMotorClient = None
    db = None


mongo_db = MongoDB()


async def connect_mongodb():
    mongo_db.client = AsyncIOMotorClient(settings.MONGODB_URL)
    mongo_db.db = mongo_db.client[settings.MONGODB_DB_NAME]


async def close_mongodb():
    if mongo_db.client:
        mongo_db.client.close()


def get_mongo_db():
    return mongo_db.db
