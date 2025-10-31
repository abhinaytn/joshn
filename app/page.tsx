import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Contributions } from "@/components/contributions";
import Header from "@/components/header";
import type { Activity } from "@/components/ui/kibo-ui/contribution-graph";
import RESUME from "@/data/resume";

const username = "abhinaytn";
const getCachedContributions = unstable_cache(
	async () => {
		const url = new URL(
			`/v4/${username}`,
			"https://github-contributions-api.jogruber.de",
		);
		const response = await fetch(url);
		const data = (await response.json()) as {
			total: { [year: string]: number };
			contributions: Activity[];
		};
		const total = data.total[new Date().getFullYear()];
		const TOTAL_SQUARES = 417;

		const sortedData = data.contributions.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
		return { contributions: sortedData.slice(0, TOTAL_SQUARES), total };
	},
	["github-contributions"],
	{ revalidate: 60 * 60 * 24 },
);

export default async function Home() {
	const { contributions, total } = await getCachedContributions();
	return (
		<div className="font-mono text-sm leading-relaxed max-w-6xl">
			<Header />

			<div className="space-y-12">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
					<div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
						About
					</div>
					<div className="col-span-1 md:col-span-9">
						<p className="text-muted-foreground">{RESUME.bio.about}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
					<div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
						Experience
					</div>
					<div className="col-span-1 md:col-span-9">
						<div className="space-y-8">
							{RESUME.experience.map((experience) => (
								<div key={experience.company}>
									<div className="mb-3">
										<Link
											href={experience.company_website}
											target="_blank"
											className="text-foreground font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
										>
											{experience.company}
										</Link>
										<span className="text-muted-foreground ml-2">
											{experience.role}
										</span>
									</div>
									<div className="text-muted-foreground leading-relaxed mb-3">
										{experience.company === "Amadeus"
											? "Built developer experience portals with backstage.io to improve oboarding and service discoverability across the organisation"
											: "Leveraging AI to intelligently process PDFs, receipts, and financial documents. Building machine learning systems that extract, understand, and automate complex document workflows."}
									</div>
									<div className="text-muted-foreground text-xs">
										{experience.company === "Amadeus"
											? "Mar 2025 to Aug 2025 — Nice, FR"
											: "Oct 2024 to Mar 2025 — Remote"}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
					<div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
						Education
					</div>
					<div className="col-span-1 md:col-span-9">
						<div className="flex justify-between">
							<div>
								<div className="mb-2">
									<span className="text-foreground font-medium">
										École Centrale de Lyon
									</span>
								</div>
								<div className="text-muted-foreground">
									Master in Computer Science
								</div>
							</div>
							<div className="text-muted-foreground">2024-2025</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
					<div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
						Skills
					</div>
					<div className="col-span-1 md:col-span-9">
						<div className="text-muted-foreground leading-relaxed">
							Python, Typescript
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
					<div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
						Interests
					</div>
					<div className="col-span-1 md:col-span-9">
						<div className="text-muted-foreground leading-relaxed">
							Open source, Football, Pokémon
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
