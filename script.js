// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tool functionality
    initAITools();
    initEditors();
    initCalculators();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// AI Tools Functionality
function initAITools() {
    // Prompt to Image
    const generateImageBtn = document.getElementById('generateImageBtn');
    const imageResultContainer = document.getElementById('imageResultContainer');
    
    generateImageBtn.addEventListener('click', function() {
        const prompt = document.getElementById('imagePrompt').value;
        const style = document.getElementById('imageStyle').value;
        
        if (!prompt) {
            alert('Please enter a prompt');
            return;
        }
        
        // Show loading state
        generateImageBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';
        generateImageBtn.disabled = true;
        
        // Simulate API call (in a real app, this would call your backend)
        setTimeout(() => {
            // For demo purposes, we'll use a placeholder image
            const placeholderImages = {
                realistic: 'https://via.placeholder.com/500x300/6e8efb/ffffff?text=Realistic+Image',
                cartoon: 'https://via.placeholder.com/500x300/a777e3/ffffff?text=Cartoon+Image',
                anime: 'https://via.placeholder.com/500x300/4acf7f/ffffff?text=Anime+Image',
                painting: 'https://via.placeholder.com/500x300/f6ab6c/ffffff?text=Painting+Image'
            };
            
            document.getElementById('generatedImage').src = placeholderImages[style];
            imageResultContainer.style.display = 'block';
            
            // Reset button
            generateImageBtn.innerHTML = 'Generate Image';
            generateImageBtn.disabled = false;
        }, 2000);
    });
    
    // Prompt to Video
    const generateVideoBtn = document.getElementById('generateVideoBtn');
    const videoResultContainer = document.getElementById('videoResultContainer');
    
    generateVideoBtn.addEventListener('click', function() {
        const prompt = document.getElementById('videoPrompt').value;
        const duration = document.getElementById('videoDuration').value;
        
        if (!prompt) {
            alert('Please enter a prompt');
            return;
        }
        
        // Show loading state
        generateVideoBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';
        generateVideoBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, we'll use a placeholder video
            document.getElementById('generatedVideo').src = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
            videoResultContainer.style.display = 'block';
            
            // Reset button
            generateVideoBtn.innerHTML = 'Generate Video';
            generateVideoBtn.disabled = false;
        }, 3000);
    });
}

// Editors Functionality
function initEditors() {
    // Photo Editor
    const photoUpload = document.getElementById('photoUpload');
    const photoCanvas = document.getElementById('photoCanvas');
    const photoCtx = photoCanvas.getContext('2d');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const applyPhotoBtn = document.getElementById('applyPhotoBtn');
    const downloadPhotoBtn = document.getElementById('downloadPhotoBtn');
    
    let currentImage = null;
    
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // Scale image to fit canvas while maintaining aspect ratio
                const scale = Math.min(
                    photoCanvas.width / img.width,
                    photoCanvas.height / img.height
                );
                const width = img.width * scale;
                const height = img.height * scale;
                const x = (photoCanvas.width - width) / 2;
                const y = (photoCanvas.height - height) / 2;
                
                photoCtx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
                photoCtx.drawImage(img, x, y, width, height);
                currentImage = img;
                
                photoCanvas.style.display = 'block';
                photoPlaceholder.style.display = 'none';
                applyPhotoBtn.disabled = false;
                downloadPhotoBtn.disabled = false;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    // Apply photo filters
    applyPhotoBtn.addEventListener('click', function() {
        if (!currentImage) return;
        
        const brightness = document.getElementById('brightnessRange').value;
        const contrast = document.getElementById('contrastRange').value;
        const saturation = document.getElementById('saturationRange').value;
        const hue = document.getElementById('hueRange').value;
        
        // Scale image to fit canvas
        const scale = Math.min(
            photoCanvas.width / currentImage.width,
            photoCanvas.height / currentImage.height
        );
        const width = currentImage.width * scale;
        const height = currentImage.height * scale;
        const x = (photoCanvas.width - width) / 2;
        const y = (photoCanvas.height - height) / 2;
        
        // Clear canvas
        photoCtx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
        
        // Apply filters
        photoCtx.filter = `
            brightness(${brightness}%)
            contrast(${contrast}%)
            saturate(${saturation}%)
            hue-rotate(${hue}deg)
        `;
        
        // Redraw image
        photoCtx.drawImage(currentImage, x, y, width, height);
        photoCtx.filter = 'none';
    });
    
    // Download photo
    downloadPhotoBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'edited-photo.png';
        link.href = photoCanvas.toDataURL('image/png');
        link.click();
    });
    
    // Video Editor
    const videoUpload = document.getElementById('videoUpload');
    const videoPreview = document.getElementById('videoPreview');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const applyVideoBtn = document.getElementById('applyVideoBtn');
    const downloadVideoBtn = document.getElementById('downloadVideoBtn');
    
    videoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        videoPreview.src = URL.createObjectURL(file);
        videoPreview.style.display = 'block';
        videoPlaceholder.style.display = 'none';
        applyVideoBtn.disabled = false;
        downloadVideoBtn.disabled = false;
    });
    
    // Apply video edits (simulated)
    applyVideoBtn.addEventListener('click', function() {
        alert('In a real application, this would process the video with the selected edits (trim, speed, etc.)');
    });
    
    // Download video (simulated)
    downloadVideoBtn.addEventListener('click', function() {
        alert('In a real application, this would download the edited video');
    });
}

// Calculators Functionality
function initCalculators() {
    // Currency Exchange
    const calculateExchangeBtn = document.getElementById('calculateExchangeBtn');
    const exchangeResult = document.getElementById('exchangeResult');
    const exchangeResultText = document.getElementById('exchangeResultText');
    const exchangeRateText = document.getElementById('exchangeRateText');
    
    // Mock exchange rates (in a real app, fetch from an API)
    const exchangeRates = {
        USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15, PKR: 175.50 },
        EUR: { USD: 1.18, GBP: 0.86, JPY: 129.50, PKR: 206.40 },
        GBP: { USD: 1.37, EUR: 1.16, JPY: 150.75, PKR: 240.25 },
        JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, PKR: 1.59 },
        PKR: { USD: 0.0057, EUR: 0.0048, GBP: 0.0042, JPY: 0.63 }
    };
    
    calculateExchangeBtn.addEventListener('click', function() {
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        const amount = parseFloat(document.getElementById('exchangeAmount').value);
        
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        // Get rate (or 1 if same currency)
        const rate = fromCurrency === toCurrency ? 1 : exchangeRates[fromCurrency][toCurrency];
        const result = amount * rate;
        
        exchangeResultText.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        exchangeRateText.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        exchangeResult.style.display = 'block';
    });
    
    // Cryptocurrency Calculator
    const calculateCryptoBtn = document.getElementById('calculateCryptoBtn');
    const cryptoResult = document.getElementById('cryptoResult');
    const cryptoResultText = document.getElementById('cryptoResultText');
    const cryptoRateText = document.getElementById('cryptoRateText');
    
    // Mock crypto rates (in a real app, fetch from an API like CoinGecko)
    const cryptoRates = {
        BTC: { USD: 30000, PKR: 5265000, EUR: 25500, GBP: 21900 },
        ETH: { USD: 1800, PKR: 315900, EUR: 1530, GBP: 1314 },
        BNB: { USD: 240, PKR: 42120, EUR: 204, GBP: 175.2 },
        SOL: { USD: 20, PKR: 3510, EUR: 17, GBP: 14.6 },
        DOGE: { USD: 0.07, PKR: 12.285, EUR: 0.0595, GBP: 0.0511 }
    };
    
    calculateCryptoBtn.addEventListener('click', function() {
        const cryptoCurrency = document.getElementById('cryptoCurrency').value;
        const toFiatCurrency = document.getElementById('toFiatCurrency').value;
        const amount = parseFloat(document.getElementById('cryptoAmount').value);
        
        if (isNaN(amount) {
            alert('Please enter a valid amount');
            return;
        }
        
        // Get rate
        const rate = cryptoRates[cryptoCurrency][toFiatCurrency];
        const result = amount * rate;
        
        cryptoResultText.textContent = `${amount} ${cryptoCurrency} = ${result.toFixed(2)} ${toFiatCurrency}`;
        cryptoRateText.textContent = `1 ${cryptoCurrency} = ${rate.toFixed(2)} ${toFiatCurrency}`;
        cryptoResult.style.display = 'block';
    });
}