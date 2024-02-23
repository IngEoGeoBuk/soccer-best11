# Create your Best11!

![screensh](./readme_img/about.gif)

#

[Features]

1. Google login
2. CRUD(Posts, comments, replies and likes)

#

[Technologies Used]

1. next.js 14
2. tailwindcss
3. react-query
4. prisma
5. postgresql
6. next-auth(google login)
7. firebase
8. zustand

#

[ERD]

![screensh](./readme_img/erd.png)

#

[Environment variable(.env)]

1. DATABASE_URL: postgresql url
2. GOOGLE_CLIENT_ID: google OAuth 2.0 client Id
3. GOOGLE_CLIENT_SECRET: google OAuth 2.0 client secret
4. SOCCER_BEST11_SERVER: API URL (ex: http://localhost:3000)
5. NEXTAUTH_SECRET: "NEXTAUTH_SECRET"
6. NEXT_PUBLIC_FIREBASE_STORAGE_URL: firebase storage url  
   (ex: https://firebasestorage.googleapis.com/v0/b/{your-project-name}.appspot.com)

#

[Setting]

1. Go to 'data_preprocessing' folder.
2. Import 'filtered_data.csv' to your db table, 'Player'
3. Create 'face' folder in your firebase storage, and upload photos.zip's photos.  
   (If you want, run 'save_csv_to_image.py' file to get the csv and pictures 😀)

#

[Detail]

1. Support dark & light mode
2. Support Infinite Scroll + Pagination(posts)
3. Support my page(View posts I wrote.)
4. Support best page(View posts received more than 2 recommendations. You can edit it.)
5. Support Mobile ver(Responsive Web Design)
