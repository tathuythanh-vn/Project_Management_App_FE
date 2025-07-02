import React from 'react';
import {Download, FileText} from 'lucide-react';
import {ProjectProgress} from "@/model/project";
import {Button} from "@/components/ui/button";

interface ExportButtonsProps {
    projectData: ProjectProgress[]
}

const ExportButtons = ({projectData}: ExportButtonsProps) => {
    const exportToCSV = () => {
        const headers = ['ID', 'Title', 'Status', 'Total Tasks', 'Completed Tasks', 'Progress (%)'];
        const csvContent = [
            headers.join(','),
            ...projectData.map(item => [
                item._id,
                `"${item.title}"`,
                item.status,
                item.totalTasks,
                item.completedTasks,
                item.progress
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'projects.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        // Create HTML content for PDF
        const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Projects Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .status-todo { color: #ff6b35; font-weight: bold; }
          .status-in-progress { color: #4ecdc4; font-weight: bold; }
          .status-completed { color: #45b7d1; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Projects Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <table>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Total Tasks</th>
              <th>Completed Tasks</th>
              <th>Progress (%)</th>
            </tr>
          </thead>
          <tbody>
            ${projectData.map(item => `
              <tr>
                <td>${item._id}</td>
                <td>${item.title}</td>
                <td class="status-${item.status.replace('_', '-')}">${item.status.replace('_', ' ').toUpperCase()}</td>
                <td>${item.totalTasks}</td>
                <td>${item.completedTasks}</td>
                <td>${item.progress}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

        // Create blob and download
        const blob = new Blob([htmlContent], {type: 'text/html'});
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'projects-report.html');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Note: This downloads as HTML. For true PDF, you'd need a PDF library
        alert('Note: This exports as HTML format. Open the downloaded file and use your browser\'s "Print to PDF" option for a true PDF.');
    };

    return (
        <div className="flex gap-4 justify-center">
            <Button
                onClick={exportToCSV}
                className="bg-[#217346] hover:bg-[#017346] text-white cursor-pointer"
            >
                <Download size={20}/>
                Export to CSV
            </Button>

            <Button
                onClick={exportToPDF}
                className="bg-[#E62B1E] hover:bg-[#E62B00] text-white cursor-pointer"
            >
                <FileText size={20}/>
                Export to PDF
            </Button>
        </div>
    );
};

export default ExportButtons;