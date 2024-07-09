// this class represents an alumni object

class Alumni {
    constructor(name, jobType, phoneNumber){
        this.name = name;
        this.jobType = jobType;
        this.phoneNumber = phoneNumber;
    }
}

// here we have a class that contains static methods that will interact with the API

class AlumniService {
    static URL = 'https://668981ca0ea28ca88b882f6c.mockapi.io/Alumni_Network';

    static getAllAlumnis(){
        return $.get(this.URL);
    }

    static getAlumni(id) {
        return $.get(this.URL + `/${id}`);
    }

    static createAlumni(alumni) {
        return $.post(this.URL, alumni);
    }

    static deleteAlumni(id) {
        return $.ajax({
            url: this.URL + `/${id}`,
            type: 'DELETE'
        });
    }

}

// this will manage DOM interaction by getting data from the AlumniService and then rendering it

class DOMManager {
    static alumnis;

    static getAllAlumnis() {
        AlumniService.getAllAlumnis().then(alumnis => this.render(alumnis));
    }

    static createAlumni(name, jobType, phoneNumber) {
        AlumniService.createAlumni(new Alumni(name, jobType, phoneNumber))
        .then(() => {
            return AlumniService.getAllAlumnis();
        })
        .then((alumnis) => this.render(alumnis));
    }

    static deleteAlumni(id){
        AlumniService.deleteAlumni(id)
        .then(() => {
            return AlumniService.getAllAlumnis();
        })
        .then((alumnis) => this.render(alumnis));
    }


    static render(alumnis) {
        this.alumnis = alumnis;
        $('#app').empty();
        for (let alumni of alumnis ){
            $('#app').prepend(
                `<div id="${alumni.id}" class="card">
                <div class="card-header">
                    <h2>${alumni.name}</h2>
                    <p>${alumni.jobType}</p>
                    <p>${alumni.phoneNumber}</p>
                    <button class="btn btn-danger" onclick="DOMManager.deleteAlumni('${alumni.id}')">Delete</button>
                </div>
            </div>
        </div> <br>`
            );
        }
    }
}

// this handles the click event of a button so that we can collect input values
// then we clear the fields afterwards

$('#create-new-alumni').click(() => {
    const name = $('#name').val()
    const jobType = $('#jobType').val()
    const phoneNumber = $('#phoneNumber').val()
    DOMManager.createAlumni(name, jobType, phoneNumber);
    $('#name').val('');
    $('#jobType').val('');
    $('#phoneNumber').val('');
});

DOMManager.getAllAlumnis();
