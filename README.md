# TRAMIX — copia limpia para GitHub + Netlify

Esta copia conserva los módulos seleccionados y retira Buró de crédito, CFE, CFE Direct, IMSS, Outlook y el receptor automático de documentos. También elimina el cliente Android/extensión que pertenecía a esos flujos.

## Módulos incluidos

- ACTANEX
- RFC SAT
- CIF SAT
- Foliador PDF
- Laboratorio de Identificación
- Extractor de documentos
- Validar CURP
- Consulta NSS (requiere clave de proveedor)
- DESCARGAR / archivos temporales

## Publicación

1. Sube el contenido de este ZIP a la raíz de un repositorio nuevo en GitHub. No subas el ZIP como un solo archivo: sube sus carpetas y archivos.
2. En Netlify, crea un sitio nuevo desde ese repositorio.
3. El archivo `netlify.toml` configura el build de Next.js y el plugin de Netlify.
4. Configura las variables necesarias en Site configuration → Environment variables. Usa `.env.example` como lista de referencia y no subas secretos a GitHub.
5. Publica y prueba los módulos uno por uno.

## Estado importante

Esta es una **copia limpia preparada para migración**, no una migración validada en producción. La interfaz y las rutas excluidas se han limpiado, pero algunas funciones del servidor todavía dependen de servicios externos:

- `@vercel/blob` sigue usándose para almacenamiento de archivos de DESCARGAR, transferencias del Foliador y registros de ACTANEX. Para que esas funciones persistan archivos se requiere `BLOB_READ_WRITE_TOKEN`. Sustituiremos esa dependencia por almacenamiento de Netlify antes de considerar completada la migración sin Vercel.
- ACTANEX requiere credenciales de GOAT (`GOAT_USER`, `GOAT_PASSWORD`).
- RFC SAT puede requerir credenciales de SATimex (`SATIMEX_USER`, `SATIMEX_PASSWORD`), según el flujo que se active.
- Consulta NSS requiere `DATOSNONSTOP_API_KEY` y el proveedor puede cobrar por consulta.
- Laboratorio de Identificación puede requerir acceso al proveedor de IA configurado en su API. Comprueba las variables de entorno antes de activar el módulo.
- La limpieza automática de archivos temporales debe configurarse y probarse en Netlify; no se ha afirmado que el cron de Vercel siga funcionando.

No compartas contraseñas personales, códigos de autenticación, cookies o tokens en el chat ni los guardes en archivos públicos. Añade los secretos solo en las variables de entorno del sitio.
