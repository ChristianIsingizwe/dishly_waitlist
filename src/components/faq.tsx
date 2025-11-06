"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import { useLanguage } from "~/providers/language-provider";

export default function Faq() {
	const { t } = useLanguage();
	
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-10">
			<div className="flex flex-col items-center justify-center gap-2 max-w-md">
				<h2 className="sm:text-3xl text-2xl font-semibold text-foreground">
					{t("faq.title")}
				</h2>
				<p className="sm:text-base text-sm text-muted-foreground text-center">
					{t("faq.subtitle")}
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
							{t("faq.q1")}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							{t("faq.a1")}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="hover:no-underline">
							{t("faq.q2")}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							{t("faq.a2")}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="hover:no-underline">
							{t("faq.q3")}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							{t("faq.a3")}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
