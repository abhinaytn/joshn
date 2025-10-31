import Link from "next/link";
import RESUME from "@/data/resume";

export default function Header() {
	return (
		<div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-border/30 pb-6 mb-12">
			<div>
				<h1 className="text-sm font-bold mb-3">{RESUME.name.toLowerCase()}</h1>
				<div className="flex justify-between items-center md:block">
					<nav className="flex flex-wrap gap-2 md:gap-4 text-muted-foreground text-sm">
						<Link href="/" className="hover:text-foreground transition-colors">
							home
						</Link>
						<span className="text-border/50 hidden md:inline">|</span>
						<Link
							href="https://www.linkedin.com/in/abhinaytn/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-foreground transition-colors"
						>
							linkedin
						</Link>
					</nav>
					<div className="text-muted-foreground text-sm md:hidden">
						Bangalore (IN) / Nice (FR)
					</div>
				</div>
			</div>
			<div className="text-muted-foreground text-sm hidden md:block">
				Bangalore (IN) / Nice (FR)
			</div>
		</div>
	);
}
