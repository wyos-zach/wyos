'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const PrimaryButton = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-[15px] bg-black px-8 py-4 text-base tracking-[-0.05em] text-white transition-all duration-500 ${className} `}
    >
      <div className='container-[inline-size] absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100'>
        <div className='absolute left-1/2 top-1/2 h-[100cqw] w-[100cqw] -translate-x-1/2 -translate-y-1/2 animate-spin bg-gradient-to-b from-transparent via-white/70 to-transparent' />
      </div>
      <div className='bg-gradient-radial absolute inset-[0.125rem] rounded-xl bg-[rgba(5,5,5,1)] from-[rgba(255,239,206,0.15)_40%_50%] via-transparent' />
      <div className='relative font-medium leading-6 tracking-wide text-[--Light-Silver]'>
        <span>{children}</span>
      </div>
    </button>
  );
};

export default PrimaryButton;
