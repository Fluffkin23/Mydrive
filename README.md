<div align="center">
  <div>
     <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>
<h3 align="center">Storage and File Sharing Platform</h3>
</div>

## <a name="tech-stack">⚙️ Tech Stack</a>

- React 19
- Next.js 15
- Appwrite
- TailwindCSS
- ShadCN
- TypeScript

## <a name="features">Features</a>

🌟 Seamless User Authentication
Effortlessly sign up, log in, and log out with Appwrite’s intuitive and secure authentication system.

🌟 Smart File Uploads
Upload documents, images, videos, and audio files with ease, keeping all your important data organized and accessible.

🌟 Effortless File Management
Browse your stored files, view them instantly in a new tab, rename, or delete with simple, intuitive controls.

🌟 Instant File Downloads
Quickly download your uploaded files, giving you immediate access to your essential content.

🌟 Simple File Sharing
Share files effortlessly, enabling seamless collaboration and easy access for others.

🌟 Insightful Dashboard
Stay informed with a beautifully designed dashboard showing total and consumed storage, recent uploads, and file summaries by type.

🌟 Powerful Global Search
Find any file or shared content in moments with a fast, intelligent search system.

🌟 Flexible Sorting Options
Sort files by date, name, or size to organize your content exactly the way you want.

🌟 Sleek, Responsive Design
A minimalist, modern interface crafted to deliver a delightful user experience across all devices.

Everything you need, thoughtfully designed, simply powerful.



## <a name="quick-start">How to run in</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Follow these steps to set up and run the project locally on your machine.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Clone the Repository**

```bash
git clone https://github.com/Fluffkin23/Mydrive.git
cd Mydrive
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new .env.local file in the root of the project.

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT=""
NEXT_PUBLIC_APPWRITE_DATABASE=""
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=""
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=""
NEXT_PUBLIC_APPWRITE_BUCKET=""
NEXT_APPWRITE_KEY=""
```

Replace the placeholders with your Appwrite credentials. To obtain these, sign up and create a project on Appwrite.

**Running the Project**

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

