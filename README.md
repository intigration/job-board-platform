# Job Board Platform

A modern job board platform built with Next.js, Tailwind CSS, and TypeScript. This platform allows job seekers to browse jobs and companies to post job listings.

## Features

- 🎨 Beautiful and responsive UI with dark mode support
- 🔍 Advanced job search and filtering
- 👥 Company dashboard for job management
- 📝 Job posting form with validation
- 🌙 Dark/Light mode toggle
- 📱 Mobile-first design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Hook Form + Zod (Form Validation)
- Lucide Icons
- Radix UI Components

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/job-board-platform.git
cd job-board-platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── companies/         # Company dashboard pages
│   ├── jobs/             # Job listing and detail pages
│   └── post-job/         # Job posting form
├── components/           # Reusable components
│   ├── ui/              # UI components
│   └── theme-provider.tsx # Theme provider for dark mode
└── lib/                 # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
