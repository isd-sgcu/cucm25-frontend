function Logo({ height }: { height?: string }) {
  return (
    <img
      src='/logo.svg'
      alt='CUCM68 Logo'
      style={{
        height: height ? `${height}px` : '56px',
      }}
    />
  )
}

export default Logo
