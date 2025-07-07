document.addEventListener('DOMContentLoaded', function() {
    const healthCheckData = [
        {
            category: "שרתי StoreFront והגדרות תצורה",
            items: [
                "כתובת הגישה למשתמשים (FQDN) מפנה ל-VIP של Load Balancer עם העברה אוטומטית בין אתרים (GSLB).",
                "תעודת ה-SSL עבור ה-VIP תקינה, מהימנה, ולא פגת תוקף.",
                "התקשורת מה-ADC לשרתי ה-StoreFront מוצפנת (HTTPS).",
                "המוניטור ב-ADC עבור StoreFront הוא מסוג STOREFRONT או בודק את '/Citrix/Store/discovery'.",
                "ה-Persistence באיזון העומסים מוגדר לפי SOURCEIP.",
                "אם שרתי ה-StoreFront באותו אשכול hypervisor, מוגדר anti-affinity להפרדתם בין מארחים פיזיים.",
                "למכונות הווירטואליות של שרתי ה-StoreFront אין snapshots ישנים.",
                "גרסת ה-StoreFront מעודכנת וכוללת את תיקוני האבטחה האחרונים.",
                "חברי קבוצת השרתים זהים במערכת ההפעלה ורמת הטלאים, וה-latency ביניהם בתחום המומלץ (פחות מ-3ms עם מועדפים).",
                "כתובת ה-Base URL ב-StoreFront היא HTTPS ומצביעה על ה-Load Balancer.",
                "אם 'מועדפים' (Subscriptions) מאופשרים, הם משוכפלים לאתר התאוששות מאסון (DR)."
            ]
        },
        {
            category: "Delivery Controllers (DDCs) וה-Site",
            items: [
                "כלי Citrix Scout Health Check אינו מציג שגיאות או אזהרות.",
                "מוגדר Anti-affinity כדי לשמור את ה-DDCs על מארחי hypervisor נפרדים.",
                "למכונות הווירטואליות של ה-DDCs אין snapshots ישנים.",
                "גרסת ה-DDC היא גרסת LTSR CU נתמכת או אחת משתי גרסאות ה-CR האחרונות.",
                "ה-Connection String ל-SQL מצביע על AlwaysOn Listener (ולא על שרת בודד) וכולל 'MultiSubnetFailover'.",
                "בסיסי הנתונים של ה-Site, Monitoring ו-Logging נפרדים.",
                "Local Host Cache מאופשר, ול-DDC יש תצורת מעבד עם שקע (socket) יחיד.",
                "מותקנות תעודות SSL על ה-DDCs להצפנת תעבורת ה-XML מול ה-StoreFront.",
                "האפשרות 'Trust XML Requests' מאופשרת עבור אימות pass-through ו-FAS.",
                "מנהלי Citrix Studio מבוקרים ומוקצים דרך קבוצות AD ולא משתמשים בודדים.",
                "אפליקציות מפורסמות לקבוצות AD.",
                "החיבור ל-Hypervisor משתמש בחשבון שירות עם הרשאות מינימליות."
            ]
        },
        {
            category: "רישוי Remote Desktop Services (RDS)",
            items: [
                "קיימים לפחות שני שרתי רישוי RDS זמינים ומשופעלים עבור שרתי RDSH VDA.",
                "גרסת מערכת ההפעלה של שרת הרישוי RDS זהה או חדשה יותר מגרסת ה-RDSH VDA.",
                "בכלי RD Licensing Manager, האפשרות 'Review Configuration' מציגה סימונים ירוקים.",
                "הכמות הכוללת של רישיונות ה-RDS המותקנים אינה חורגת מהכמות שנרכשה.",
                "הגדרות ה-GPO על שרתי ה-RDSH VDA מפנות כראוי לשרתי הרישוי הזמינים."
            ]
        },
        {
            category: "VDA - בניית Master Image",
            items: [
                "תהליך בניית ה-Master Image מתועד ומאוטמט (למשל, באמצעות BIS-F).",
                "סריקת אבטחה של ה-Master Image מראה עמידה במדיניות האבטחה הארגונית.",
                "גרסת ה-VDA מעודכנת עם תיקוני האבטחה האחרונים.",
                "אנטי-וירוס מותקן ומותאם לסביבות non-persistent (VDI).",
                "סוכני ניהול אחרים (כמו SCCM) מותאמים למכונות non-persistent.",
                "נעשה שימוש ב-Citrix Optimizer או כלי דומה להסרת רכיבים מיותרים ואופטימיזציה של מערכת ההפעלה.",
                "עדכוני Windows עדכניים.",
                "ניהול צריכת החשמל מוגדר על High Performance.",
                "בשימוש ב-PVS, קובץ ה-pagefile מותאם בגודלו לדיסק ה-cache, ולוגי המערכת מופנים אליו.",
                "FSLogix מותקן בגרסה עדכנית ומשמש לנדידת החיפוש של Outlook.",
                "Microsoft Teams מותקן באמצעות המתקין הכלל-מכונתי (machine-wide) ומעודכן תקופתית.",
                "בסביבת NVIDIA vGPU, דרייבר ה-Guest מותקן לפני תוכנת ה-VDA."
            ]
        },
        {
            category: "Citrix Provisioning (PVS)",
            items: [
                "גרסת שרת ה-PVS תואמת לגרסת ה-DDC.",
                "קיימים מספר שרתי PVS לטובת HA, עם anti-affinity ברמת ה-hypervisor.",
                "לשרתי PVS יש מספיק זיכרון RAM עבור vDisk caching (כ-2-3 GB לכל vDisk פעיל).",
                "ה-vDisks הם בפורמט VHDX, בגודל דינמי, ועברו איחוי (defragmentation).",
                "שיטת האתחול של ה-Target Device (כמו PXE/DHCP) היא בעלת זמינות גבוהה.",
                "ה-Write Cache של ה-Target Device מוגדר כ-'RAM with overflow to disk'.",
                "ה-Target Devices מפוזרים באופן שווה בין שרתי ה-PVS.",
                "מחיצת ה-System Reserved הוסרה מתוך ה-vDisk."
            ]
        },
        {
            category: "מדיניות (Group Policy & Citrix Policy)",
            items: [
                "ה-VDAs נמצאים ביחידות ארגוניות (OUs) ייעודיות, עם Block Inheritance ו-Loopback Processing מאופשרים.",
                "תבניות ה-admx. ב-SYSVOL (של Citrix, Office וכו') עדכניות.",
                "מדיניות Citrix מנוהלת באמצעות GPO, ולא גם ב-Studio וגם ב-GPO.",
                "מפתח הרישום הישן 'DisableGPCalculation' אינו קיים, כדי להבטיח שמדיניות תחול בהתחברות מחדש.",
                "מיפוי כוננים, לוח (clipboard) ו-USB מהקליינט מבוטלים כברירת מחדל עבור חיבורים חיצוניים.",
                "נאכף שימוש ב-Universal Print Driver כדי להימנע מהתקנת דרייברים נייטיב על ה-VDAs.",
                "איכות השמע מוגדרת ל-Medium כדי לחסוך ברוחב פס.",
                "האפשרות Adaptive Transport (EDT) מאופשרת.",
                "האפשרות Session Reliability מאופשרת."
            ]
        },
        {
            category: "ניהול פרופילים ו-WEM",
            items: [
                "ניהול הפרופילים (Profile Management) מוגדר באמצעות GPO, ולא דרך WEM או Citrix Policy.",
                "שרת הקבצים של הפרופילים הוא בזמינות גבוהה וקרוב ל-VDAs.",
                "לא נעשה שימוש בשכפול DFS multi-master עבור שרתי הקבצים של הפרופילים.",
                "הרשאות NTFS על תיקיות הפרופילים מעניקות למשתמשים הרשאות בלעדיות לתיקייה שלהם.",
                "האפשרות Profile streaming מאופשרת, ו-Active Write Back מבוטלת.",
                "תיקיית AppData אינה מנותבת (NOT redirected).",
                "בשימוש ב-WEM, הוא בגרסה עדכנית, פרוס ב-HA, והסוכנים מפנים לכתובת LB.",
                "ב-WEM, האפשרויות CPU Optimization ו-Fast Logoff מאופשרות.",
                "סוגי פעולות שאינם בשימוש ב-WEM מבוטלים כדי להאיץ את זמני הכניסה."
            ]
        }
    ];

    const form = document.getElementById('healthCheckForm');
    let formHtml = '';

    healthCheckData.forEach(section => {
        formHtml += `<div class="form-section"><h2>${section.category}</h2>`;
        formHtml += '<table><thead><tr><th>בדיקה</th><th>סטטוס</th><th>הערות</th></tr></thead><tbody>';
        
        section.items.forEach(item => {
            formHtml += `
                <tr>
                    <td>${item}</td>
                    <td>
                        <select>
                            <option value="">בחר סטטוס</option>
                            <option value="תקין">תקין</option>
                            <option value="דורש טיפול">דורש טיפול</option>
                            <option value="לא רלוונטי">לא רלוונטי</option>
                        </select>
                    </td>
                    <td><input type="text" placeholder="הערות..."></td>
                </tr>
            `;
        });

        formHtml += '</tbody></table></div>';
    });
    
    const clientDetails = form.querySelector('.client-details');
    clientDetails.insertAdjacentHTML('afterend', formHtml);
});

function generateReport() {
    const clientName = document.getElementById('clientName').value;
    const checkDate = document.getElementById('checkDate').value;
    const checkedBy = document.getElementById('checkedBy').value;
    const cvadVersion = document.getElementById('cvadVersion').value;

    let reportHtml = `
        <!DOCTYPE html>
        <html lang="he" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>דוח בדיקת תקינות - ${clientName}</title>
            <style>
                body { font-family: Arial, sans-serif; direction: rtl; }
                h1, h2 { color: #005696; }
                h1 { text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
                h2 { border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;}
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: right; }
                th { background-color: #f2f2f2; }
                .status-ok { color: green; font-weight: bold; }
                .status-issue { color: red; font-weight: bold; }
                .client-details-table { border: none; width: auto; margin-bottom: 30px; }
                .client-details-table td { border: none; padding: 5px; }
                .client-details-table td:first-child { font-weight: bold; padding-left: 15px; }
                 @media print {
                    button { display: none; }
                 }
            </style>
        </head>
        <body>
            <h1>דוח בדיקת תקינות - Citrix Virtual Apps & Desktops</h1>
            <table class="client-details-table">
                <tr><td>שם הלקוח:</td><td>${clientName}</td></tr>
                <tr><td>תאריך הבדיקה:</td><td>${new Date(checkDate).toLocaleDateString('he-IL')}</td></tr>
                <tr><td>נבדק על ידי:</td><td>${checkedBy}</td></tr>
                <tr><td>גרסת CVAD:</td><td>${cvadVersion}</td></tr>
            </table>
            <hr>
    `;

    const sections = document.querySelectorAll('.form-section:not(.client-details)');
    sections.forEach(section => {
        const title = section.querySelector('h2').innerText;
        reportHtml += `<h2>${title}</h2>`;
        reportHtml += '<table><thead><tr><th>בדיקה</th><th>סטטוס</th><th>הערות</th></tr></thead><tbody>';
        
        const rows = section.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const check = row.cells[0].innerText;
            const status = row.cells[1].querySelector('select').value;
            const notes = row.cells[2].querySelector('input').value;
            
            let statusClass = '';
            if (status === 'תקין') statusClass = 'status-ok';
            if (status === 'דורש טיפול') statusClass = 'status-issue';

            reportHtml += `
                <tr>
                    <td>${check}</td>
                    <td class="${statusClass}">${status}</td>
                    <td>${notes}</td>
                </tr>
            `;
        });
        reportHtml += '</tbody></table>';
    });
    
    reportHtml += `<p style="margin-top: 40px; text-align: center; color: #555;">-- סוף הדוח --</p></body></html>`;

    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHtml);
    reportWindow.document.close();
    setTimeout(() => {
        reportWindow.print();
    }, 500);
}