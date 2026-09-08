const packages = [
  { amount: 1000, bonus: 0, label: "Starter" },
  { amount: 3000, bonus: 300, label: "Popular 🔥" },
  { amount: 5000, bonus: 800, label: "Chill Pro" },
];

// Then INSIDE your existing return ( ... ) add:

<div className="grid grid-cols-3 gap-3 my-4">
  {packages.map((p) => (
    <button
      key={p.amount}
      onClick={() => handleFund(p.amount)}
      className="bg-white p-4 rounded-xl shadow text-center"
    >
      <p className="font-bold">₦{p.amount}</p>
      {p.bonus > 0 && (
        <p className="text-green-600 text-xs">+₦{p.bonus} bonus</p>
      )}
      <p className="text-xs text-gray-500">{p.label}</p>
    </button>
  ))}
</div>
