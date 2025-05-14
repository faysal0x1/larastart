import FAQItem from './FAQItem';

export default function FAQSection({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <FAQItem 
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}