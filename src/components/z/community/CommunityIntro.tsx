export function CommunityIntro() {
  return (
    <section className='mx-auto max-w-3xl space-y-6 px-4 text-center'>
      <p className='text-lg leading-relaxed text-muted-foreground'>
        The WYOS Community is a no-BS space where real growth happens through
        authentic conversations. This isn't about superficial connections or
        empty motivation - we're here to cut through the noise and support each
        other's actual progress.
      </p>

      <p className='text-lg leading-relaxed text-muted-foreground'>
        You'll find people who:
      </p>

      <ul className='mx-auto grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-2'>
        <li className='rounded-lg border p-4'>
          • Speak truth without sugarcoating
        </li>
        <li className='rounded-lg border p-4'>
          • Share real struggles &amp; wins
        </li>
        <li className='rounded-lg border p-4'>• Offer practical advice</li>
        <li className='rounded-lg border p-4'>• Hold each other accountable</li>
      </ul>
    </section>
  );
}
