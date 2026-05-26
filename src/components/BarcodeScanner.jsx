import { useState, useRef, useEffect } from 'react';
import { searchBarcode } from '../data/barcodeDatabase.js';
import './BarcodeScanner.css';

const BarcodeScanner = ({ isOpen, onClose, onSelectFood }) => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [manualBarcode, setManualBarcode] = useState('');
  const [scannedFood, setScannedFood] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Simulate barcode scanning (in real app, would use camera)
  const handleManualScan = () => {
    if (!manualBarcode.trim()) {
      setError('Please enter a barcode');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate scanning delay
    setTimeout(() => {
      const food = searchBarcode(manualBarcode);
      if (food) {
        setScannedFood(food);
        setScannedBarcode(manualBarcode);
        setError(null);
      } else {
        setError('Barcode not found in database. Try another barcode.');
        setScannedFood(null);
      }
      setLoading(false);
    }, 500);
  };

  // Handle selecting the scanned food
  const handleSelectFood = () => {
    if (scannedFood) {
      onSelectFood({
        name: scannedFood.name,
        calories: scannedFood.calories.toString(),
        protein: scannedFood.protein.toString(),
        carbs: scannedFood.carbs.toString(),
        fats: scannedFood.fats.toString()
      });
      resetScanner();
      onClose();
    }
  };

  // Reset scanner
  const resetScanner = () => {
    setScannedBarcode('');
    setManualBarcode('');
    setScannedFood(null);
    setError(null);
    setUseCamera(false);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="barcode-modal-overlay" onClick={onClose}>
      <div className="barcode-modal" onClick={(e) => e.stopPropagation()}>
        <div className="barcode-header">
          <h2>📱 Barcode Scanner</h2>
          <button className="barcode-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="barcode-content">
          {!scannedFood ? (
            <>
              <div className="scanner-tabs">
                <button 
                  className={`tab-btn ${!useCamera ? 'active' : ''}`}
                  onClick={() => setUseCamera(false)}
                >
                  ⌨️ Manual Entry
                </button>
                <button 
                  className={`tab-btn ${useCamera ? 'active' : ''}`}
                  onClick={() => setUseCamera(true)}
                >
                  📷 Camera
                </button>
              </div>

              {!useCamera ? (
                <div className="manual-scan">
                  <div className="scan-input-group">
                    <label htmlFor="barcode-input">Enter Barcode Number:</label>
                    <input
                      id="barcode-input"
                      type="text"
                      placeholder="e.g., 5901234123457"
                      value={manualBarcode}
                      onChange={(e) => setManualBarcode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleManualScan()}
                      className="barcode-input"
                      disabled={loading}
                    />
                    <button 
                      onClick={handleManualScan}
                      disabled={loading || !manualBarcode.trim()}
                      className="scan-btn"
                    >
                      {loading ? '🔍 Scanning...' : '🔍 Scan'}
                    </button>
                  </div>

                  <div className="sample-barcodes">
                    <p className="sample-title">Sample Barcodes to Try:</p>
                    <div className="barcode-list">
                      <button 
                        className="sample-barcode"
                        onClick={() => setManualBarcode('5901234123457')}
                      >
                        Chicken Breast
                      </button>
                      <button 
                        className="sample-barcode"
                        onClick={() => setManualBarcode('5901234123463')}
                      >
                        Brown Rice
                      </button>
                      <button 
                        className="sample-barcode"
                        onClick={() => setManualBarcode('5901234123469')}
                      >
                        Broccoli
                      </button>
                      <button 
                        className="sample-barcode"
                        onClick={() => setManualBarcode('5901234123474')}
                      >
                        Apple
                      </button>
                      <button 
                        className="sample-barcode"
                        onClick={() => setManualBarcode('5901234123479')}
                      >
                        Almonds
                      </button>
                      <button 
                        className="sample-barcode"
                        onClick={() => setManualBarcode('5901234123484')}
                      >
                        Protein Shake
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="camera-scan">
                  <div className="camera-placeholder">
                    <p>📷 Camera scanning coming soon!</p>
                    <p className="camera-note">Use manual entry for now</p>
                  </div>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}
            </>
          ) : (
            <div className="scan-result">
              <div className="result-header">
                <h3>✅ Food Found!</h3>
                <p className="barcode-display">Barcode: {scannedBarcode}</p>
              </div>

              <div className="food-details">
                <div className="detail-item">
                  <span className="detail-label">Food Name:</span>
                  <span className="detail-value">{scannedFood.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Calories:</span>
                  <span className="detail-value">{scannedFood.calories} kcal</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Protein:</span>
                  <span className="detail-value">{scannedFood.protein}g</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Carbs:</span>
                  <span className="detail-value">{scannedFood.carbs}g</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Fats:</span>
                  <span className="detail-value">{scannedFood.fats}g</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{scannedFood.category}</span>
                </div>
              </div>

              <div className="result-actions">
                <button 
                  onClick={handleSelectFood}
                  className="select-btn"
                >
                  ✅ Add to Log
                </button>
                <button 
                  onClick={resetScanner}
                  className="rescan-btn"
                >
                  🔄 Scan Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
