import { ImageResponse } from 'next/og';

// Image metadata
export const runtime = 'edge';

// Image size
const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Cache OG images for 1 hour
export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const title = searchParams.get('title') || 'Furma.tech';
  const subtitle = searchParams.get('subtitle') || 'Digital Venture Studio';
  const variant = (searchParams.get('variant') as 'default' | 'product' | 'aitlas') || 'default';

  // Color schemes for different variants
  const colors = {
    default: {
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 45%, #ec4899 100%)',
      accent: '#f59e0b',
      bg: '#fafafa',
    },
    product: {
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      accent: '#3b82f6',
      bg: '#fafafa',
    },
    aitlas: {
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 45%, #ec4899 100%)',
      accent: '#f59e0b',
      bg: '#0a0a0a',
    },
  };

  const scheme = colors[variant];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: variant === 'aitlas' 
            ? '#0a0a0a' 
            : 'radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
          padding: '60px',
        }}
      >
        {/* Logo Mark */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            background: scheme.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            boxShadow: '0 20px 60px rgba(245, 158, 11, 0.3)',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: '700',
              color: '#fff',
              fontFamily: 'serif',
            }}
          >
            F
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '700',
            color: variant === 'aitlas' ? '#fafafa' : '#0d0d0d',
            marginBottom: '20px',
            textAlign: 'center',
            fontFamily: 'serif',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '32px',
            color: variant === 'aitlas' ? '#a3a3a3' : '#525252',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontWeight: '500',
          }}
        >
          {subtitle}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: scheme.gradient,
          }}
        />

        {/* Footer info */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '60px',
            fontSize: '18px',
            color: variant === 'aitlas' ? '#666' : '#999',
            fontFamily: 'monospace',
          }}
        >
          furma.tech
        </div>

        {/* Status badge */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: variant === 'aitlas' ? 'rgba(255,255,255,0.1)' : 'rgba(245, 158, 11, 0.1)',
            borderRadius: '9999px',
            border: `1px solid ${variant === 'aitlas' ? 'rgba(255,255,255,0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              color: variant === 'aitlas' ? '#fff' : '#f59e0b',
              fontFamily: 'monospace',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Public Beta
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
