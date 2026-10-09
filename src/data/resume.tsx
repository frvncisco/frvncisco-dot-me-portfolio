import { Icons } from "@/components/icons";
import { Docker } from "@/components/ui/svgs/docker";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";
import { BriefcaseIcon, HomeIcon, MailIcon, NotebookIcon, UserIcon } from "lucide-react";

export const DATA = {
	name: 'Francisco Santana',
	initials: 'FS',
	url: 'https://heyfrancisco.me',
	location: 'Atlanta, GA',
	locationLink: 'https://www.google.com/maps/place/atlanta',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed auctor risus. Fusce vitae porttitor leo. Mauris eget mollis neque. Pellentesque dignissim quam vel lorem vehicula, eu viverra dui lobortis.',
	summary:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed auctor risus. Fusce vitae porttitor leo. Mauris eget mollis neque. Pellentesque dignissim quam vel lorem vehicula, eu viverra dui lobortis. Donec ut purus quis tellus semper tempus. Curabitur eget varius nisi, vitae viverra justo. Nullam hendrerit fermentum eros, sit amet vulputate lectus porttitor nec. Nam id dolor a dolor scelerisque molestie finibus a erat. Proin felis nunc, imperdiet et fermentum et, tincidunt in leo. Donec id libero non dolor mattis placerat. Aliquam erat volutpat. Vivamus id quam in augue sagittis rutrum sit amet vitae magna. Phasellus at est vitae ante convallis tempus. Sed luctus rutrum neque, eu tristique risus maximus eget. Integer et libero non eros venenatis interdum. Ut sit amet felis et nisi cursus fermentum. Fusce malesuada, ante vitae tempor vehicula, leo lacus pulvinar tellus, quis porttitor mauris tellus non quam. Nullam vitae nibh mollis, venenatis orci in, aliquet urna. Aenean interdum metus massa, ac suscipit massa viverra vitae.',
	avatarUrl: '/me.png',
	skills: [
		{ name: 'React', icon: ReactLight },
		{ name: 'Next.js', icon: NextjsIconDark },
		{ name: 'Typescript', icon: Typescript },
		{ name: 'Node.js', icon: Nodejs },
		{ name: 'Python', icon: Python },
		{ name: 'Docker', icon: Docker },
	],
	navbar: [
		{ href: '/', icon: HomeIcon, label: 'Home', flag: null },
		{ href: '/about', icon: UserIcon, label: 'About', flag: null },
		{ href: '/work', icon: BriefcaseIcon, label: 'Work', flag: 'work' },
		{ href: '/contact', icon: MailIcon, label: 'Contact', flag: 'contact' },
		{ href: '/blog', icon: NotebookIcon, label: 'Blog', flag: 'blog' },
	] as const,
	contact: {
		email: 'hello@example.com',
		tel: '+123456789',
		social: {
			GitHub: {
				name: 'GitHub',
				url: 'https://dub.sh/dillion-github',
				icon: Icons.github,
				navbar: true,
			},

			LinkedIn: {
				name: 'LinkedIn',
				url: 'https://dub.sh/dillion-linkedin',
				icon: Icons.linkedin,

				navbar: true,
			},
			email: {
				name: 'Send Email',
				url: '#',
				icon: Icons.email,

				navbar: false,
			},
		},
	},

	work: [
		{
			company: 'Niche',
			href: 'https://atomic.finance',
			badges: [],
			location: 'Remote',
			title: 'Frontend Software Engineer',
			logoUrl: '/atomic.png',
			start: 'May 2021',
			end: 'Oct 2022',
			description:
				'Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.',
		},
		{
			company: 'Blackhawk Network',
			badges: [],
			href: 'https://shopify.com',
			location: 'Remote',
			title: 'Fullstack Software Engineer',
			logoUrl: '/shopify.svg',
			start: 'January 2021',
			end: 'April 2021',
			description:
				'Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.',
		},
	],
	education: [
		{
			school: 'Coursera',
			href: 'https://uwaterloo.ca',
			degree: 'Google UX Design',
			logoUrl: '/waterloo.png',
			end: '2024',
		},
		{
			school: 'University of New Hampshire',
			href: 'https://uwaterloo.ca',
			degree: "Bachelor's Degree of Computer Science",
			logoUrl: '/waterloo.png',
		},
	],
	projects: [
		{
			title: 'Chat Collect',
			href: 'https://chatcollect.com',
			dates: 'Jan 2024 - Feb 2024',
			active: true,
			description:
				'With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.',
			technologies: [
				'Next.js',
				'Typescript',
				'PostgreSQL',
				'Prisma',
				'TailwindCSS',
				'Stripe',
				'Shadcn UI',
				'Magic UI',
			],
			links: [
				{
					type: 'Website',
					href: 'https://chatcollect.com',
					icon: <Icons.globe className="size-3" />,
				},
			],
			image: '',
			video:
				'https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4',
		},
		{
			title: 'Magic UI',
			href: 'https://magicui.design',
			dates: 'June 2023 - Present',
			active: true,
			description:
				'Designed, developed and sold animated UI components for developers.',
			technologies: [
				'Next.js',
				'Typescript',
				'PostgreSQL',
				'Prisma',
				'TailwindCSS',
				'Stripe',
				'Shadcn UI',
				'Magic UI',
			],
			links: [
				{
					type: 'Website',
					href: 'https://magicui.design',
					icon: <Icons.globe className="size-3" />,
				},
				{
					type: 'Source',
					href: 'https://github.com/magicuidesign/magicui',
					icon: <Icons.github className="size-3" />,
				},
			],
			image: '',
			video: 'https://cdn.magicui.design/bento-grid.mp4',
		},
		{
			title: 'llm.report',
			href: 'https://llm.report',
			dates: 'April 2023 - September 2023',
			active: true,
			description:
				'Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.',
			technologies: [
				'Next.js',
				'Typescript',
				'PostgreSQL',
				'Prisma',
				'TailwindCSS',
				'Shadcn UI',
				'Magic UI',
				'Stripe',
				'Cloudflare Workers',
			],
			links: [
				{
					type: 'Website',
					href: 'https://llm.report',
					icon: <Icons.globe className="size-3" />,
				},
				{
					type: 'Source',
					href: 'https://github.com/dillionverma/llm.report',
					icon: <Icons.github className="size-3" />,
				},
			],
			image: '',
			video: 'https://cdn.llm.report/openai-demo.mp4',
		},
		{
			title: 'Automatic Chat',
			href: 'https://automatic.chat',
			dates: 'April 2023 - March 2024',
			active: true,
			description:
				'Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.',
			technologies: [
				'Next.js',
				'Typescript',
				'PostgreSQL',
				'Prisma',
				'TailwindCSS',
				'Shadcn UI',
				'Magic UI',
				'Stripe',
				'Cloudflare Workers',
			],
			links: [
				{
					type: 'Website',
					href: 'https://automatic.chat',
					icon: <Icons.globe className="size-3" />,
				},
			],
			image: '',
			video:
				'https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4',
		},
	],
} as const
