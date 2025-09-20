import { FaqSection } from "@/components/faq";

const DEMO_FAQS = [
  {
    question: "What is this platform about?",
    answer:
      "This platform allows citizens to easily report civic issues like potholes, broken streetlights, garbage collection, and drainage problems. Municipal staff can then track, manage, and resolve these issues efficiently.",
  },
  {
    question: "How do I report an issue?",
    answer:
      "Simply log in as a citizen, fill out the issue report form by selecting a category, writing a short description, adding location details, and uploading an image if possible. Once submitted, your report is sent to the municipal team.",
  },
  {
    question: "Can I track the status of my complaint?",
    answer:
      "Yes, you can view all the complaints you’ve submitted under the 'My Reports' section. Each report shows its current status, such as Pending, In Progress, or Resolved.",
  },
  {
    question: "Who can see my complaints?",
    answer:
      "Only you and the municipal staff can see the details of your complaints. In some cases, aggregated issue data may be displayed publicly to improve transparency.",
  },
];

export function FaqSectionDemo() {
  return (
    <FaqSection
      title="Frequently Asked Questions"
      description="Everything you need to know about our issue reporting platform"
      items={DEMO_FAQS}
      contactInfo={{
        title: "Still have questions?",
        description: "We're here to help you",
        buttonText: "Contact Support",
        onContact: () => console.log("Contact support clicked"),
      }}
    />
  );
}
