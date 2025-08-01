# Stage 1
FROM node:18.19.0-alpine3.17 as react-build
 
USER root
 
# Accept the BRANCH argument
ARG BRANCH
 
# Argument from docker build cmd
ENV BRANCH=${BRANCH:-"develop"}
 
RUN echo "Building for environment: $BRANCH"
 
# to access environment name inside running container/app
ENV BRANCH=${BRANCH}
 
WORKDIR /codebase
 
COPY  . .
 
COPY package.json .
 
RUN npm install
 
RUN if [ "$BRANCH" = "master" ] || [ "$BRANCH" = "main" ]; then \
  npm run build:production; \
  else \
  npm run build:${BRANCH}; \
  fi
 
# Stage 2
FROM nginx:1.29
USER root
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=react-build /codebase/build /usr/share/nginx/html/kubeassist
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
