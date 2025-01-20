# Nution - Notion Clone

Welcome to **Nution**, a modern Notion clone built with the latest technologies. Nution allows users to create, organize, and manage their notes, tasks, and ideas, just like the popular Notion app.

[Live Demo](https://nution-shivams-projects-0d7a6fe1.vercel.app/)

## Technologies Used

- **Next.js**: A React framework for building server-rendered web applications.
- **Vercel**: The deployment platform that hosts this app.
- **Convex**: A backend-as-a-service for real-time, cloud-native apps.
- **Tailwind CSS**: A utility-first CSS framework for building modern UIs.
- **ShadCN UI**: A UI library that provides accessible and reusable components.
- **EdgeStore**: A storage solution for managing real-time data.
- **Clerk**: User authentication and management service for secure sign-ins and user management.

## Features

- User authentication with **Clerk**.
- Real-time data sync using **Convex**.
- Full-featured note-taking and task management.
- Mobile-responsive design.
- Seamless storage management with **EdgeStore**.
- Intuitive, customizable UI using **Tailwind CSS** and **ShadCN** components.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 16.x)
- **Yarn** (or npm)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nution.git
   cd nution
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add your configuration keys:

   ```
   NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
   CLERK_API_KEY=your-clerk-api-key
   CONVEX_API_KEY=your-convex-api-key
   ```

4. Run the development server:

   ```bash
   yarn dev
   ```

   Open `http://localhost:3000` in your browser to view the app.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Commit your changes (`git commit -m 'Add feature xyz'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For more information, check out the live project at [Nution](https://nution-shivams-projects-0d7a6fe1.vercel.app/).
