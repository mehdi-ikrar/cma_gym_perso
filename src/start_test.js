console.log('🚀 Starting CMA_GYM app test...');

try {
  const { router } = await import('./back/route/index_router.js');
  const { checkAuth } = await import('./back/middlewares/checkAuth.js');
  console.log('✅ All imports OK');
} catch (err) {
  console.error('❌ Import failed:', err);
  process.exit(1);
}

import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Express server listening on port ${PORT}`);
});
