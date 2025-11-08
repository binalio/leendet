document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
});

async function checkServerStatus() {
    const statusInfo = document.getElementById('status-info');
    
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (data.status === 'ok') {
            statusInfo.innerHTML = `
                <p><strong>✅ Sistema Operativo</strong></p>
                <p>${data.message}</p>
                <p><small>Última actualización: ${new Date(data.timestamp).toLocaleString('es-ES')}</small></p>
            `;
            statusInfo.classList.add('status-ok');
        }
    } catch (error) {
        statusInfo.innerHTML = `
            <p><strong>⚠️ Error de Conexión</strong></p>
            <p>No se pudo conectar con el servidor.</p>
        `;
    }
}
