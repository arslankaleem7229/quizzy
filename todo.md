- restrict open ai api call for each user
- finalized setting page by integrated modal/drawer
- search/library component make dynamic
- add audio option if possible
- reviews integration
- redis/socketio/BullMQ integration and prisma migration
- breakdown only ai api to multiple parts for better utility
- fix errors
- follow folder dir and refactor and organize code
- start deployment

OPTIONAL:

- Try Stripe demo
- try free providers
- Notifications
- Mobile App

docker stop $(docker ps -aq) && \  
docker rm $(docker ps -aq) && \
docker rmi -f $(docker images -aq) && \
docker volume prune -f && \
docker builder prune -a -f && \
docker system prune -a --volumes -f
