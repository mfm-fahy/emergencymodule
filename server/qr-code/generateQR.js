import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dummyPatients = [
  { uhid: 'UHID001', name: 'John Doe', age: 45, gender: 'Male', mobile: '9876543210', address: 'Chennai' },
  { uhid: 'UHID002', name: 'Jane Smith', age: 32, gender: 'Female', mobile: '9876543211', address: 'Trichy' },
  { uhid: 'UHID003', name: 'Robert Brown', age: 58, gender: 'Male', mobile: '9876543212', address: 'Madurai' },
  { uhid: 'UHID004', name: 'Emily Davis', age: 28, gender: 'Female', mobile: '9876543213', address: 'Coimbatore' },
  { uhid: 'UHID005', name: 'Michael Wilson', age: 65, gender: 'Male', mobile: '9876543214', address: 'Salem' }
];

const generateQRCodes = async () => {
  for (const patient of dummyPatients) {
    const qrData = JSON.stringify(patient);
    const fileName = `${patient.uhid}.png`;
    const filePath = path.join(__dirname, fileName);
    
    await QRCode.toFile(filePath, qrData);
    console.log(`Generated QR code: ${fileName}`);
  }
  console.log('All QR codes generated successfully!');
};

generateQRCodes();
