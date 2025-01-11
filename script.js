// Datos de ejemplo (normalmente estos vendrían de una base de datos)
let labRequests = [];
let infoRequests = [];
let appointments = [];

// Manejo de tabs
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Lab Requests
document.getElementById('labRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const request = {
        id: Date.now(),
        teacherName: document.getElementById('teacherName').value,
        teacherId: document.getElementById('teacherId').value,
        labDate: document.getElementById('labDate').value,
        status: document.getElementById('labStatus').value
    };
    labRequests.push(request);
    updateLabRequestsTable();
    this.reset();
});

function updateLabRequestsTable() {
    const table = document.getElementById('labRequestsTable');
    let html = `
        <table>
            <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Fecha</th>
                <th>Status</th>
                <th>Acciones</th>
            </tr>
    `;
    
    labRequests.forEach(request => {
        html += `
            <tr>
                <td>${request.teacherName}</td>
                <td>${request.teacherId}</td>
                <td>${request.labDate}</td>
                <td>${request.status}</td>
                <td>
                    <button class="edit-button" onclick="editLabRequest(${request.id})">Editar</button>
                    <button class="delete-button" onclick="deleteLabRequest(${request.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
    
    html += '</table>';
    table.innerHTML = html;
    
    updateTeachersByDate();
}

function updateTeachersByDate() {
    const counts = {};
    labRequests.forEach(request => {
        counts[request.labDate] = (counts[request.labDate] || 0) + 1;
    });
    
    let html = '<h3>Maestros por Fecha:</h3>';
    for (const [date, count] of Object.entries(counts)) {
        html += `<p>${date}: ${count} maestro(s)</p>`;
    }
    
    document.getElementById('teachersByDate').innerHTML = html;
}

function editLabRequest(id) {
    const request = labRequests.find(r => r.id === id);
    if (request) {
        document.getElementById('teacherName').value = request.teacherName;
        document.getElementById('teacherId').value = request.teacherId;
        document.getElementById('labDate').value = request.labDate;
        document.getElementById('labStatus').value = request.status;
        
        labRequests = labRequests.filter(r => r.id !== id);
        updateLabRequestsTable();
    }
}

function deleteLabRequest(id) {
    labRequests = labRequests.filter(r => r.id !== id);
    updateLabRequestsTable();
}

// Info Requests
document.getElementById('infoRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const request = {
        id: Date.now(),
        name: document.getElementById('infoName').value,
        infoId: document.getElementById('infoId').value,
        status: document.getElementById('infoStatus').value,
        submittedDate: document.getElementById('submittedDate').value,
        untilDate: document.getElementById('untilDate').value
    };
    infoRequests.push(request);
    updateInfoRequestsTable();
    this.reset();
});

function updateInfoRequestsTable() {
    const table = document.getElementById('infoRequestsTable');
    let html = `
        <table>
            <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Status</th>
                <th>Fecha Enviado</th>
                <th>Fecha Límite</th>
                <th>Acciones</th>
            </tr>
    `;
    
    infoRequests.forEach(request => {
        html += `
            <tr>
                <td>${request.name}</td>
                <td>${request.infoId}</td>
                <td>${request.status}</td>
                <td>${request.submittedDate}</td>
                <td>${request.untilDate}</td>
                <td>
                    <button class="delete-button" onclick="deleteInfoRequest(${request.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
    
    html += '</table>';
    table.innerHTML = html;
}

function deleteInfoRequest(id) {
    infoRequests = infoRequests.filter(r => r.id !== id);
    updateInfoRequestsTable();
}

// Appointments
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const appointment = {
        id: Date.now(),
        name: document.getElementById('appointmentName').value,
        appointmentId: document.getElementById('appointmentId').value,
        date: document.getElementById('appointmentDate').value,
        status: document.getElementById('appointmentStatus').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        processTime: document.getElementById('processTime').value
    };
    appointments.push(appointment);
    updateAppointmentsTable();
    this.reset();
});

function updateAppointmentsTable() {
    const table = document.getElementById('appointmentsTable');
    let html = `
        <table>
            <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Fecha</th>
                <th>Status</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Tiempo</th>
                <th>Acciones</th>
            </tr>
    `;
    
    appointments.forEach(appointment => {
        html += `
            <tr>
                <td>${appointment.name}</td>
                <td>${appointment.appointmentId}</td>
                <td>${appointment.date}</td>
                <td>${appointment.status}</td>
                <td>${appointment.age}</td>
                <td>${appointment.gender}</td>
                <td>${appointment.processTime}</td>
                <td>
                    <button class="delete-button" onclick="deleteAppointment(${appointment.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
    
    html += '</table>';
    table.innerHTML = html;
}

function deleteAppointment(id) {
    appointments = appointments.filter(a => a.id !== id);
    updateAppointmentsTable();
}

function exportToCSV(type) {
    let data = [];
    let filename = '';
    let headers = [];

    switch(type) {
        case 'labRequests':
            data = labRequests;
            filename = 'lab_requests.csv';
            headers = ['Nombre', 'ID', 'Fecha', 'Status'];
            break;
        case 'infoRequests':
            data = infoRequests;
            filename = 'info_requests.csv';
            headers = ['Nombre', 'ID', 'Status', 'Fecha Enviado', 'Fecha Límite'];
            break;
        case 'appointments':
            data = appointments;
            filename = 'appointments.csv';
            headers = ['Nombre', 'ID', 'Fecha', 'Status', 'Edad', 'Sexo', 'Tiempo'];
            break;
    }

    let csvContent = headers.join(',') + '\n';

    data.forEach(item => {
        let row = [];
        switch(type) {
            case 'labRequests':
                row = [
                    item.teacherName,
                    item.teacherId,
                    item.labDate,
                    item.status
                ];
                break;
            case 'infoRequests':
                row = [
                    item.name,
                    item.infoId,
                    item.status,
                    item.submittedDate,
                    item.untilDate
                ];
                break;
            case 'appointments':
                row = [
                    item.name,
                    item.appointmentId,
                    item.date,
                    item.status,
                    item.age,
                    item.gender,
                    item.processTime
                ];
                break;
        }
        csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
