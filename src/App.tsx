import { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import ResultRow from './ResultRow';
import axios from 'axios';
import { sortBy } from 'lodash';
import useDebouncedEffect from 'use-debounced-effect-hook';
import Load from "./Load";

type CacheResult = {
  provider: string;
  eth: string;
};

type OfferResults = { [key: string]: string };

const defaultAmount = '100';

function App() {
  const [prevAmount, setPrevAmount] = useState('100');
  const [amount, setAmount] = useState('100');
  const [cachedResults, setCachedResults] = useState<CacheResult[]>([]);
  const [offerResults, setOfferResults] = useState<OfferResults>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://uijzqpfjhn.us.aircode.run/cachedValues').then(res => {
      setCachedResults(res.data);
      setLoading(false);
    });
  }, []);

  useDebouncedEffect(() => {
    if (amount === defaultAmount) {
      return;
    }
    if (amount !== prevAmount) {
      setLoading(true);
      axios
        .get(`https://uijzqpfjhn.us.aircode.run/offers?amount=${amount}`)
        .then(res => {
          setLoading(false);
          setOfferResults(res.data);
          setPrevAmount(amount);
        });
    }
  }, [amount]);

  
  const sortedResults: CacheResult[] = sortBy(Object.keys(offerResults).map(provider => ({
    provider,
    eth: offerResults[provider]
  })), 'eth').reverse();

  const showCached = amount === defaultAmount;

  

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-6xl text-center font-bold bg-gradient-to-br from-purple-600 to-sky-400 bg-clip-text text-transparent from 30%">Find Cheapest Ethereum</h1>
      <div className="flex justify-center mt-6">
        <AmountInput value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="mt-6">
        {loading && (
          <Load/>
        )}
        {!loading && showCached && sortBy(cachedResults, '').map((result: CacheResult) => (
          <ResultRow
            key={result.provider}
            providerName={result.provider}
            eth={result.eth}
          />
        ))}
        {!loading && !showCached && sortedResults.map(result => (
          <ResultRow
            key={result.provider}
            providerName={result.provider}
            eth={result.eth}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
