const regions=['us-east-1', 'eu-central-1', 'master', 'test', 'mica-6388'];

regions.forEach(region => {
    const all_status_content = document.getElementById('all-status-content');
    fetchHealthcheck(region, all_status_content);
});