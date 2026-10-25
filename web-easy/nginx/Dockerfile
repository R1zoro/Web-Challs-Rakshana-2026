FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Prepare temp directory permissions for non-root execution
RUN chmod -R 777 /tmp /var/cache/nginx /var/run

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
