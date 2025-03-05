'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Send,
  BarChart2,
  Globe,
  Video,
  PlaneTakeoff,
  AudioLines,
} from 'lucide-react';

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export type Action = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
}

interface SearchResult {
  actions: Action[];
}

const allActions = [
  {
    id: '1',
    label: 'Book tickets',
    icon: <PlaneTakeoff className='h-4 w-4 text-blue-500' />,
    description: 'Operator',
    short: '⌘K',
    end: 'Command',
  },
  {
    id: '2',
    label: 'Send message',
    icon: <Send className='h-4 w-4 text-green-500' />,
    description: 'gpt-4o',
    short: '⌘Enter',
    end: 'Command',
  },
  {
    id: '3',
    label: 'View analytics',
    icon: <BarChart2 className='h-4 w-4 text-purple-500' />,
    description: 'View your analytics dashboard',
    short: '',
    end: 'Command',
  },
  {
    id: '4',
    label: 'Join meeting',
    icon: <Video className='h-4 w-4 text-red-500' />,
    description: 'Join the current meeting',
    short: '',
    end: 'Command',
  },
  {
    id: '5',
    label: 'Voice command',
    icon: <AudioLines className='h-4 w-4 text-yellow-500' />,
    description: 'Activate voice assistant',
    short: '',
    end: 'Command',
  },
  {
    id: '6',
    label: 'Browse web',
    icon: <Globe className='h-4 w-4 text-blue-500' />,
    description: 'gpt-4o',
    short: '',
    end: 'Command',
  },
];

function ActionSearchBar({ actions = allActions }: { actions?: Action[] }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [_isTyping, setIsTyping] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    if (!debouncedQuery) {
      setResult({ actions: actions });
      return;
    }

    const searchResults = actions.filter((action) =>
      action.label.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    setResult({ actions: searchResults });
  }, [debouncedQuery, actions]);

  useEffect(() => {
    if (result && result.actions.length > 0 && !selectedAction) {
      setSelectedAction(result.actions[0]);
    }
  }, [result, selectedAction]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!result) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!selectedAction) {
        setSelectedAction(result.actions[0]);
      } else {
        const currentIndex = result.actions.findIndex(
          (action) => action.id === selectedAction.id
        );
        const nextIndex = (currentIndex + 1) % result.actions.length;
        setSelectedAction(result.actions[nextIndex]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!selectedAction) {
        setSelectedAction(
          result.actions[result.actions.length - 1]
        );
      } else {
        const currentIndex = result.actions.findIndex(
          (action) => action.id === selectedAction.id
        );
        const nextIndex =
          (currentIndex - 1 + result.actions.length) % result.actions.length;
        setSelectedAction(result.actions[nextIndex]);
      }
    } else if (e.key === 'Enter' && selectedAction) {
      e.preventDefault();
      // Execute the selected action
      executeAction(selectedAction);
    }
  };

  // Function to execute the selected action
  const executeAction = (_action: Action) => {
    // Implementation of action execution
    // Replace console.log with actual action execution logic
    // For now, just a placeholder until actual implementation
  };

  return (
    <div className='relative w-full max-w-md'>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <Search className='h-4 w-4 text-gray-400' />
        </div>
        <Input
          type='text'
          placeholder='Search actions...'
          className='pl-10 pr-4 py-2 w-full rounded-lg bg-zinc-900/60 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 300);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <AnimatePresence>
        {isFocused && result && result.actions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className='absolute z-10 mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900/95 shadow-lg backdrop-blur-sm overflow-hidden'
          >
            <ul className='max-h-80 overflow-auto py-1' role="listbox">
              {result.actions.map((action) => (
                <li
                  key={action.id}
                  role="option"
                  aria-selected={selectedAction?.id === action.id}
                  tabIndex={0}
                  onMouseEnter={() => setSelectedAction(action)}
                  onClick={() => executeAction(action)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      executeAction(action);
                    }
                  }}
                  className={`px-4 py-2 cursor-pointer flex items-center justify-between ${
                    selectedAction?.id === action.id
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'hover:bg-zinc-800/80'
                  }`}
                >
                  <div className='flex items-center space-x-3'>
                    <div className='flex-shrink-0 rounded-md bg-zinc-800/50 p-1.5'>
                      {action.icon}
                    </div>
                    <div>
                      <div className='font-medium text-white'>{action.label}</div>
                      {action.description && (
                        <div className='text-xs text-gray-400'>
                          {action.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    {action.short && (
                      <span className='text-xs text-gray-400 bg-zinc-800 px-1.5 py-0.5 rounded'>
                        {action.short}
                      </span>
                    )}
                    {action.end && (
                      <span className='text-xs text-gray-400'>
                        {action.end}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { ActionSearchBar };
