// Autenticar acceso a rutas
export const auth = (req, res, next) => {
  console.log(req.isAuthenticated);
  if (req.isAuthenticated) {
    return next();
  }
  res.status(401).json({ message: "No estás autorizado" });
};
