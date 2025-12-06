import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScanSuccess: (data: any) => void;
}

const QRScanner = ({ onScanSuccess }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode('qr-reader');
      }
      const result = await scannerRef.current.scanFile(file, false);
      console.log('QR Scan Result:', result);
      const data = JSON.parse(result);
      console.log('Parsed Data:', data);
      onScanSuccess(data);
    } catch (error) {
      console.error('QR Scan Error:', error);
      alert('Failed to scan QR code: ' + error);
    }
  };

  const startCameraScan = async () => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode('qr-reader');
      }
      await scannerRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          const data = JSON.parse(decodedText);
          onScanSuccess(data);
          stopCameraScan();
        },
        () => {}
      );
      setScanning(true);
    } catch (error) {
      alert('Camera access denied or not available');
    }
  };

  const stopCameraScan = async () => {
    if (scannerRef.current && scanning) {
      await scannerRef.current.stop();
      setScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current && scanning) {
        scannerRef.current.stop();
      }
    };
  }, [scanning]);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '2rem' }}>
      <h2>Scan Patient QR Code</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Upload QR Code Image:</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ padding: '0.5rem', width: '100%' }}
        />
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Upload the generated QR code (UHID001.png, UHID002.png, etc.)
        </p>
      </div>

      <div style={{ borderTop: '1px solid #ccc', paddingTop: '2rem', marginBottom: '2rem' }}>
        <h3>Or Use Camera:</h3>
        <div id="qr-reader" style={{ marginBottom: '1rem' }} />
        {!scanning ? (
          <button onClick={startCameraScan} style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
            Start Camera Scan
          </button>
        ) : (
          <button onClick={stopCameraScan} style={{ padding: '0.5rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
            Stop Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
