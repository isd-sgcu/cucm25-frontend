function Logo({ height }: { height?: string }) {
  return (
    <img
      src='/logo.svg'
      alt='CUCM68 Logo'
      className={`${height ? `h-[${height}px]` : 'h-14'} w-auto`}
    />
  )
}

export default Logo
