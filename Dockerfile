FROM node

WORKDIR /d/fullstack/backend/Projects/internship/crudoperation/server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

# CMD "npm" "start"
CMD ["npm" ,"start"]