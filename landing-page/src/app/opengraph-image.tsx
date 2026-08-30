import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'IA Sem Limites — Automação no WhatsApp';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#090a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Big Bold Clean Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: '#10b981',
            }}
          />
          <div
            style={{
              color: '#ffffff',
              fontSize: '56px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            IA SEM LIMITES
          </div>
        </div>

        {/* Crisp Bold Title */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#e5e7eb',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.3,
          }}
        >
          Como automatizar sua <span style={{ color: '#10b981' }}>captação e vendas</span> no WhatsApp com n8n
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
