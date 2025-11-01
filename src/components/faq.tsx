import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-10">
			<div className="flex flex-col items-center justify-center gap-2 max-w-md">
				<h2 className="sm:text-3xl text-2xl font-semibold text-foreground">
					Frequently Asked Questions
				</h2>
				<p className="sm:text-base text-sm text-muted-foreground text-center">
					Everything you need to know about Dishly. Find answers to common
					questions.
				</p>
			</div>
			<div className="w-full max-w-lg">
				<Accordion
					type="single"
					collapsible
					className="w-full flex flex-col gap-4"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="hover:no-underline">
							How does the AI food search work?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Just like chatting with ChatGPT, you can describe what you're craving in natural language—whether it's a dish name, description, cuisine type, or even dietary restrictions. You can also upload a photo of food you want to find. Our AI understands your request and instantly finds nearby restaurants that match, using real-time data from registered restaurants in your area.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="hover:no-underline">
							How accurate and up-to-date is the restaurant information?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							All our restaurant data comes directly from registered restaurant partners, ensuring real-time accuracy for dishes, availability, and pricing. Unlike apps that rely on third-party or outdated information, you get trustworthy, current data every time you search.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="hover:no-underline">
							How does pre-ordering work for dine-in and pickup?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							After finding your perfect restaurant, you can book a table and pre-order your meal. For dine-in, your food will be ready when you arrive—just sit down and enjoy. For pickup, choose your preferred time and your order will be waiting. No waiting around, no delays. Your meal is timed perfectly with your arrival.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
