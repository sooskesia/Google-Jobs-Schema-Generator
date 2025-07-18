document.getElementById('remoteJob').addEventListener('change', function () {
  const section = document.getElementById('locationSection');
  section.style.display = this.checked ? 'none' : 'block';
});

document.getElementById('schemaForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": document.getElementById('jobTitle').value,
    "description": document.getElementById('jobDescription').value,
    "hiringOrganization": {
      "@type": "Organization",
      "name": document.getElementById('companyName').value,
      "url": document.getElementById('companyUrl').value,
      "industry": document.getElementById('industry').value
    },
    "employmentType": document.getElementById('employmentType').value,
    "workHours": document.getElementById('workHours').value,
    "datePosted": document.getElementById('datePosted').value,
    "validThrough": document.getElementById('validThrough').value,
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": document.getElementById('salary').value || "0"
    },
    "jobLocation": document.getElementById('remoteJob').checked ? "Remote" : {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": document.getElementById('street').value,
        "addressLocality": document.getElementById('city').value,
        "postalCode": document.getElementById('postalCode').value,
        "addressCountry": document.getElementById('country').value
      }
    }
  };

  document.getElementById('output').textContent = JSON.stringify(schema, null, 2);
});

document.getElementById('copyBtn').addEventListener('click', function () {
  const schema = document.getElementById('output').textContent;
  navigator.clipboard.writeText(schema).then(() => {
    alert('Schema copied to clipboard!');
  });
});
