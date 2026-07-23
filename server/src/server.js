cat > src/server.js << 'EOF'
require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`EMS API running on port ${PORT}`));
EOF