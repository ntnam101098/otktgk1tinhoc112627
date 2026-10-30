import { Part1Question, Part2Question, Part3Question } from '../types/quiz';

export const LESSONS = [
  { id: 1, title: 'Bài 1: Hệ điều hành', desc: '5 chức năng, phân loại HĐH, giao diện GUI, plug & play' },
  { id: 2, title: 'Bài 2: Thực hành sử dụng HĐH', desc: 'Quản lý tệp/thư mục, File Explorer, kiểm tra đĩa HDD/SSD' },
  { id: 3, title: 'Bài 3: Phần mềm nguồn mở & Internet', desc: 'Mã nguồn mở, OpenOffice, Google Docs/Sheets, giấy phép' },
  { id: 4, title: 'Bài 4: Bên trong máy tính', desc: 'CPU, RAM, ROM, HDD, SSD, cổng logic AND/OR/NOT, cộng nhị phân' },
  { id: 5, title: 'Bài 5: Kết nối thiết bị số', desc: 'Thiết bị vào/ra, HDMI, VGA, USB, Bluetooth, inch, DPI, Hz' },
  { id: 6, title: 'Bài 6: Lưu trữ & chia sẻ trực tuyến', desc: 'Google Drive, OneDrive, phân quyền xem, nhận xét, chỉnh sửa' },
  { id: 7, title: 'Bài 7: Tìm kiếm thông tin Internet', desc: 'Kỹ thuật tìm kiếm chính xác "", lọc loại tệp filetype:pdf' },
  { id: 8, title: 'Bài 8: Email & Mạng xã hội nâng cao', desc: 'Nhãn Gmail, is:important, gắn thẻ, quyền riêng tư Facebook' },
];

export const PART1_QUESTIONS: Part1Question[] = [
  {
    id: 1,
    level: 'Biết',
    lesson: 'Bài 1: Hệ điều hành',
    question: 'Trong các phương án dưới đây, phương án nào thể hiện chức năng của hệ điều hành?',
    options: [
      { key: 'A', text: 'Quản lí việc thực hiện chương trình.' },
      { key: 'B', text: 'Tính toán trong bảng tính.' },
      { key: 'C', text: 'Soạn thảo nội dung văn bản.' },
      { key: 'D', text: 'Thiết kế bài trình chiếu.' },
    ],
    correctAnswer: 'A',
    explanation: 'Hệ điều hành có 5 chức năng cốt lõi: Quản lí thiết bị; Quản lí tệp và thư mục; Quản lí việc thực hiện chương trình; Cung cấp giao diện giao tiếp với người dùng; Cung cấp các tiện ích hệ thống. Các phương án B, C, D là chức năng của phần mềm ứng dụng.'
  },
  {
    id: 2,
    level: 'Biết',
    lesson: 'Bài 1: Hệ điều hành',
    question: 'Phương án nào sau đây cho biết hai hệ điều hành thường dùng trên điện thoại thông minh?',
    options: [
      { key: 'A', text: 'Windows và Linux.' },
      { key: 'B', text: 'Chrome và Firefox.' },
      { key: 'C', text: 'Docs và Sheets.' },
      { key: 'D', text: 'Android và iOS.' },
    ],
    correctAnswer: 'D',
    explanation: 'Android (Google) và iOS (Apple) là hai hệ điều hành phổ biến nhất hiện nay trên các thiết bị di động (smartphone/tablet).'
  },
  {
    id: 3,
    level: 'Biết',
    lesson: 'Bài 2: Thực hành sử dụng HĐH',
    question: 'Trong File Explorer, em muốn sao chép một tệp sang thư mục khác và giữ nguyên tệp ở thư mục ban đầu. Em cần thực hiện những thao tác nào sau đây?',
    options: [
      { key: 'A', text: 'Sao chép và Dán.' },
      { key: 'B', text: 'Đổi tên và Cắt.' },
      { key: 'C', text: 'Cắt và Dán.' },
      { key: 'D', text: 'Xóa và Đổi tên.' },
    ],
    correctAnswer: 'A',
    explanation: 'Thao tác Sao chép (Copy) và Dán (Paste) giúp nhân bản tệp sang vị trí mới và giữ nguyên tệp gốc. Nếu dùng Cắt (Cut) và Dán (Paste) thì tệp gốc sẽ bị di chuyển chứ không còn ở vị trí ban đầu.'
  },
  {
    id: 4,
    level: 'Biết',
    lesson: 'Bài 3: Phần mềm nguồn mở & Internet',
    question: 'Phát biểu nào sau đây mô tả đúng đặc điểm của phần mềm nguồn mở?',
    options: [
      { key: 'A', text: 'Mã nguồn đóng để bảo vệ ý tưởng và chống sửa đổi.' },
      { key: 'B', text: 'Miễn phí và được tự do sử dụng mà không phải xin phép.' },
      { key: 'C', text: 'Cho phép sử dụng qua Internet mà không cần cài đặt vào máy.' },
      { key: 'D', text: 'Cung cấp mã nguồn và các quyền theo giấy phép nguồn mở.' },
    ],
    correctAnswer: 'D',
    explanation: 'Phần mềm nguồn mở (Open Source Software) cung cấp công khai mã nguồn cùng các quyền sử dụng, sửa đổi, phân phối theo quy định của giấy phép nguồn mở (ví dụ GPL, MIT, Apache).'
  },
  {
    id: 5,
    level: 'Biết',
    lesson: 'Bài 4: Bên trong máy tính',
    question: 'Bên trong máy tính, bộ phận nào có nhiệm vụ thực hiện các lệnh và xử lí dữ liệu?',
    options: [
      { key: 'A', text: 'Bàn phím.' },
      { key: 'B', text: 'CPU.' },
      { key: 'C', text: 'Máy in.' },
      { key: 'D', text: 'Loa.' },
    ],
    correctAnswer: 'B',
    explanation: 'CPU (Central Processing Unit - Bộ xử lí trung tâm) là bộ não của máy tính, đảm nhiệm vai trò nhận lệnh, giải mã, thực hiện các chỉ thị lệnh và điều khiển xử lí dữ liệu.'
  },
  {
    id: 6,
    level: 'Biết',
    lesson: 'Bài 4: Bên trong máy tính',
    question: 'Để đánh giá tốc độ của CPU, các nhà sản xuất dùng đơn vị GHz. Đơn vị này còn được gọi với tên nào khác?',
    options: [
      { key: 'A', text: 'Bộ nhớ truy cập nhanh.' },
      { key: 'B', text: 'Dung lượng lưu trữ.' },
      { key: 'C', text: 'Tần số đồng hồ xung.' },
      { key: 'D', text: 'Số nhân bộ xử lí.' },
    ],
    correctAnswer: 'C',
    explanation: 'GHz (Gigahertz) là đơn vị đo tần số xung nhịp đồng hồ (clock speed/clock rate) của bộ xử lý, thể hiện số chu kỳ dao động thực hiện được trong mỗi giây.'
  },
  {
    id: 7,
    level: 'Biết',
    lesson: 'Bài 5: Kết nối thiết bị số',
    question: 'Trong các thiết bị dưới đây, thiết bị nào là thiết bị vào?',
    options: [
      { key: 'A', text: 'Máy chiếu.' },
      { key: 'B', text: 'Máy in.' },
      { key: 'C', text: 'Loa.' },
      { key: 'D', text: 'Micro.' },
    ],
    correctAnswer: 'D',
    explanation: 'Micro là thiết bị vào (input device) thu nhận âm thanh từ môi trường đưa vào máy tính xử lí. Máy chiếu, máy in, loa là các thiết bị ra (output device).'
  },
  {
    id: 8,
    level: 'Hiểu',
    lesson: 'Bài 4: Bên trong máy tính',
    question: 'An đã lưu một tệp vào ổ SSD rồi tắt máy đúng cách. Khi bật máy trở lại, An vẫn mở được tệp đó. Phát biểu nào sau đây giải thích đúng điều này?',
    options: [
      { key: 'A', text: 'SSD vẫn lưu được dữ liệu khi ngắt điện, còn RAM thì không.' },
      { key: 'B', text: 'ROM đã tự động chuyển tệp từ SSD sang RAM trước khi tắt máy.' },
      { key: 'C', text: 'Máy tính đã tự động lưu tệp lên Internet trước khi tắt máy.' },
      { key: 'D', text: 'RAM vẫn lưu tệp và chuyển lại vào SSD khi bật máy.' },
    ],
    correctAnswer: 'A',
    explanation: 'Ổ SSD (bộ nhớ ngoài) là bộ nhớ không khả biến (non-volatile), giữ nguyên dữ liệu ngay cả khi mất điện hay tắt máy. Ngược lại RAM là bộ nhớ khả biến (volatile), toàn bộ dữ liệu sẽ biến mất khi mất nguồn điện.'
  },
  {
    id: 9,
    level: 'Hiểu',
    lesson: 'Bài 5: Kết nối thiết bị số',
    question: 'Minh dùng cáp VGA để nối máy tính với màn hình và muốn truyền cả hình ảnh lẫn âm thanh qua cáp này. Vì sao cáp VGA không đáp ứng được yêu cầu của Minh?',
    options: [
      { key: 'A', text: 'VGA chỉ truyền âm thanh.' },
      { key: 'B', text: 'VGA chỉ dùng tín hiệu số.' },
      { key: 'C', text: 'VGA chỉ truyền hình ảnh.' },
      { key: 'D', text: 'VGA chỉ dùng cho máy in.' },
    ],
    correctAnswer: 'C',
    explanation: 'Chuẩn kết nối VGA (Video Graphics Array) sử dụng tín hiệu tương tự (analog) và chỉ hỗ trợ truyền tín hiệu hình ảnh, hoàn toàn không truyền tín hiệu âm thanh. Để truyền cả hai cần dùng chuẩn HDMI hoặc DisplayPort.'
  },
  {
    id: 10,
    level: 'Biết',
    lesson: 'Bài 6: Lưu trữ & chia sẻ trực tuyến',
    question: 'Dịch vụ nào sau đây được dùng để lưu trữ và chia sẻ tệp trực tuyến?',
    options: [
      { key: 'A', text: 'Google Sheets.' },
      { key: 'B', text: 'Google Docs.' },
      { key: 'C', text: 'Google Drive.' },
      { key: 'D', text: 'Google Slides.' },
    ],
    correctAnswer: 'C',
    explanation: 'Google Drive là dịch vụ lưu trữ đám mây và chia sẻ tệp tin trực tuyến. Docs, Sheets, Slides là các ứng dụng soạn thảo văn bản, bảng tính, trình chiếu nằm trong hệ sinh thái đó.'
  },
  {
    id: 11,
    level: 'Hiểu',
    lesson: 'Bài 7: Tìm kiếm thông tin Internet',
    question: 'Khi tìm kiếm trên Internet, Lan đặt cụm từ "khoa học máy tính" trong dấu ngoặc kép. Cách tìm này có tác dụng gì?',
    options: [
      { key: 'A', text: 'Tìm các trang có ít nhất một từ trong cụm từ đã nhập.' },
      { key: 'B', text: 'Tìm các trang có các từ đã nhập theo thứ tự bất kỳ.' },
      { key: 'C', text: 'Tìm các trang chứa chính xác cụm từ “khoa học máy tính”.' },
      { key: 'D', text: 'Tìm các trang chỉ có hình ảnh về khoa học máy tính.' },
    ],
    correctAnswer: 'C',
    explanation: 'Khi đặt cụm từ trong cặp dấu ngoặc kép "...", công cụ tìm kiếm sẽ lọc ra các kết quả chứa chính xác cụm từ đó theo đúng thứ tự các từ.'
  },
  {
    id: 12,
    level: 'Hiểu',
    lesson: 'Bài 8: Email & Mạng xã hội nâng cao',
    question: 'Lan gắn nhãn “Bài tập” cho các email giao bài của giáo viên. Việc gắn nhãn này giúp ích gì cho Lan?',
    options: [
      { key: 'A', text: 'Dễ tìm lại và quản lí các email giao bài.' },
      { key: 'B', text: 'Tự động gửi bài làm cho giáo viên.' },
      { key: 'C', text: 'Tự động đánh dấu các email là đã đọc.' },
      { key: 'D', text: 'Ngăn các email bị chuyển vào Thùng rác.' },
    ],
    correctAnswer: 'A',
    explanation: 'Nhãn (Labels) trong Gmail có chức năng phân loại, gom nhóm thư theo chuyên mục, giúp người dùng dễ dàng tìm kiếm, lọc và quản lý email khoa học hơn.'
  },
  {
    id: 13,
    level: 'Biết',
    lesson: 'Bài 1: Hệ điều hành',
    question: 'Người dùng thao tác với máy tính qua giao diện đồ họa bằng cách nào sau đây?',
    options: [
      { key: 'A', text: 'Tương tác qua cửa sổ, biểu tượng và bảng chọn.' },
      { key: 'B', text: 'Thông qua các thao tác với chuột máy tính.' },
      { key: 'C', text: 'Dùng cơ chế dòng lệnh máy tính hỗ trợ.' },
      { key: 'D', text: 'Chỉ dùng các thao tác với bàn phím.' },
    ],
    correctAnswer: 'A',
    explanation: 'Giao diện đồ họa (GUI - Graphical User Interface) đặc trưng bởi các thành phần: Cửa sổ (Windows), Biểu tượng (Icons), Bảng chọn (Menus) và con trỏ (Pointer) - mô hình WIMP.'
  },
  {
    id: 14,
    level: 'Biết',
    lesson: 'Bài 2: Thực hành sử dụng HĐH',
    question: 'Người dùng chạy tiện ích kiểm tra đĩa cứng để thực hiện công việc nào sau đây?',
    options: [
      { key: 'A', text: 'Phát hiện và xử lí một số lỗi của đĩa cứng/hệ thống tệp.' },
      { key: 'B', text: 'Tăng kích thước vật lí của đĩa cứng.' },
      { key: 'C', text: 'Quản lí tệp và thư mục trên đĩa cứng.' },
      { key: 'D', text: 'Phân chia lại đĩa cứng.' },
    ],
    correctAnswer: 'A',
    explanation: 'Tiện ích kiểm tra đĩa (Check Disk / Error Checking) giúp quét bề mặt đĩa cứng và cấu trúc tệp nhằm phát hiện, cô lập hoặc sửa chữa các lỗi logic và điểm hỏng (bad sectors).'
  },
  {
    id: 15,
    level: 'Biết',
    lesson: 'Bài 2: Thực hành sử dụng HĐH',
    question: 'Ứng dụng lịch trên điện thoại giúp người dùng thực hiện công việc nào sau đây?',
    options: [
      { key: 'A', text: 'Thay đổi các thói quen dùng điện thoại.' },
      { key: 'B', text: 'Quản lí sự kiện và nhắc việc.' },
      { key: 'C', text: 'Định dạng lại lịch sử dụng điện thoại.' },
      { key: 'D', text: 'Lưu toàn bộ lịch sử dùng điện thoại.' },
    ],
    correctAnswer: 'B',
    explanation: 'Ứng dụng Calendar (Lịch) cung cấp chức năng ghi chú thời gian biểu, quản lý các sự kiện, cuộc hẹn và gửi thông báo nhắc việc đúng hạn cho người dùng.'
  },
  {
    id: 16,
    level: 'Biết',
    lesson: 'Bài 3: Phần mềm nguồn mở & Internet',
    question: 'Khi tìm hiểu một phần mềm, em thấy thuật ngữ “mã nguồn”. Thuật ngữ này chỉ nội dung nào sau đây?',
    options: [
      { key: 'A', text: 'Chương trình được viết bằng ngôn ngữ lập trình.' },
      { key: 'B', text: 'Chương trình đã được mã hóa.' },
      { key: 'C', text: 'Thông tin của nhà phát hành phần mềm.' },
      { key: 'D', text: 'Số sê-ri của phần mềm máy tính.' },
    ],
    correctAnswer: 'A',
    explanation: 'Mã nguồn (Source Code) là chuỗi các chỉ thị được viết bằng ngôn ngữ lập trình bậc cao (như C++, Java, Python...) mà con người có thể đọc và hiểu được trước khi biên dịch sang mã máy.'
  },
  {
    id: 17,
    level: 'Biết',
    lesson: 'Bài 3: Phần mềm nguồn mở & Internet',
    question: 'Trong các phần mềm dưới đây, phần mềm nào được phát hành dưới dạng nguồn mở?',
    options: [
      { key: 'A', text: 'Ứng dụng OpenOffice.' },
      { key: 'B', text: 'Ứng dụng Adobe Photoshop.' },
      { key: 'C', text: 'Ứng dụng Microsoft Word.' },
      { key: 'D', text: 'Hệ điều hành Windows.' },
    ],
    correctAnswer: 'A',
    explanation: 'Apache OpenOffice là bộ phần mềm văn phòng mã nguồn mở miễn phí. Photoshop, Word và Windows là các sản phẩm thương mại nguồn đóng độc quyền.'
  },
  {
    id: 18,
    level: 'Biết',
    lesson: 'Bài 3: Phần mềm nguồn mở & Internet',
    question: 'Người dùng có thể sử dụng Google Sheets để thực hiện công việc nào sau đây?',
    options: [
      { key: 'A', text: 'Chỉnh sửa bài trình chiếu.' },
      { key: 'B', text: 'Quản lí bộ nhớ máy tính.' },
      { key: 'C', text: 'Tạo và xử lí bảng tính.' },
      { key: 'D', text: 'Soạn thảo văn bản.' },
    ],
    correctAnswer: 'C',
    explanation: 'Google Sheets là ứng dụng xử lý bảng tính trực tuyến (tương tự Microsoft Excel), dùng để lập bảng, tính toán dữ liệu với công thức và vẽ biểu đồ.'
  },
  {
    id: 19,
    level: 'Hiểu',
    lesson: 'Bài 3: Phần mềm nguồn mở & Internet',
    question: 'Mai được sử dụng một phần mềm miễn phí nhưng nhà phát triển không công khai mã nguồn. Nhận xét nào sau đây đúng về phần mềm này?',
    options: [
      { key: 'A', text: 'Chưa thể coi là nguồn mở chỉ vì được dùng miễn phí.' },
      { key: 'B', text: 'Phần mềm không thể chạy trên máy tính.' },
      { key: 'C', text: 'Phần mềm chắc chắn không có giấy phép.' },
      { key: 'D', text: 'Mọi người được tự ý sửa mã nguồn.' },
    ],
    correctAnswer: 'A',
    explanation: 'Phần mềm miễn phí (Freeware) không đồng nghĩa với phần mềm nguồn mở. Một phần mềm chỉ được gọi là nguồn mở khi nhà phát triển công khai mã nguồn và cấp quyền theo giấy phép nguồn mở.'
  },
  {
    id: 20,
    level: 'Biết',
    lesson: 'Bài 4: Bên trong máy tính',
    question: 'Lan đọc thông số của một ổ SSD và thấy ghi 512 GB. Thông số này cho biết đặc điểm nào của ổ đĩa?',
    options: [
      { key: 'A', text: 'Số lõi CPU.' },
      { key: 'B', text: 'Tần số đồng hồ xung.' },
      { key: 'C', text: 'Dung lượng bộ nhớ đệm.' },
      { key: 'D', text: 'Dung lượng lưu trữ.' },
    ],
    correctAnswer: 'D',
    explanation: 'GB (Gigabyte) là đơn vị đo dung lượng lưu trữ dữ liệu của thiết bị nhớ như SSD, HDD, USB hay thẻ nhớ.'
  },
  {
    id: 21,
    level: 'Biết',
    lesson: 'Bài 4: Bên trong máy tính',
    question: 'Với cổng AND có hai đầu vào, đầu ra nhận giá trị 1 trong trường hợp nào sau đây?',
    options: [
      { key: 'A', text: 'Cả hai đầu vào bằng 0.' },
      { key: 'B', text: 'Chỉ một đầu vào bằng 1.' },
      { key: 'C', text: 'Cả hai đầu vào bằng 1.' },
      { key: 'D', text: 'Bất kể giá trị đầu vào.' },
    ],
    correctAnswer: 'C',
    explanation: 'Quy tắc logic của cổng AND: Đầu ra bằng 1 khi và chỉ khi TẤT CẢ các đầu vào đều bằng 1 (1 AND 1 = 1; các trường hợp khác đều cho kết quả 0).'
  },
  {
    id: 22,
    level: 'Biết',
    lesson: 'Bài 4: Bên trong máy tính',
    question: 'Khi nhận một bit đầu vào, cổng NOT tạo ra bit đầu ra như thế nào?',
    options: [
      { key: 'A', text: 'Đảo 0 thành 1 và 1 thành 0.' },
      { key: 'B', text: 'Luôn giữ nguyên bit.' },
      { key: 'C', text: 'Cộng thêm một bit nhớ.' },
      { key: 'D', text: 'Luôn cho kết quả 1.' },
    ],
    correctAnswer: 'A',
    explanation: 'Cổng NOT thực hiện phép đảo logic (phép phủ định): nếu đầu vào là 0 thì đầu ra là 1, nếu đầu vào là 1 thì đầu ra là 0.'
  },
  {
    id: 23,
    level: 'Hiểu',
    lesson: 'Bài 4: Bên trong máy tính',
    question: 'Bình muốn dùng một cổng OR thay cho mạch cộng hai bit. Khi cả hai đầu vào đều bằng 1, vì sao cách thay thế này không đúng?',
    options: [
      { key: 'A', text: 'OR không nhận được các đầu vào bằng 1.' },
      { key: 'B', text: 'Phép cộng và OR đều luôn cho kết quả 0.' },
      { key: 'C', text: 'OR cho hai bit 10 còn mạch cộng chỉ cho một bit 1.' },
      { key: 'D', text: 'Phép cộng cho bit tổng 0, bit nhớ 1; OR chỉ cho một bit kết quả 1.' },
    ],
    correctAnswer: 'D',
    explanation: 'Trong phép cộng nhị phân 1 + 1 = 10 (bit tổng bằng 0, có bit nhớ 1 sang hàng bên trái). Trong khi đó phép OR cho 1 OR 1 = 1 (chỉ 1 bit đơn không có bit nhớ), do đó không thể dùng một cổng OR để thay thế mạch cộng.'
  },
  {
    id: 24,
    level: 'Hiểu',
    lesson: 'Bài 5: Kết nối thiết bị số',
    question: 'Hai màn hình đều có đường chéo 24 inch, nhưng độ phân giải lần lượt là 1920 × 1080 và 2560 × 1440. Em có thể rút ra nhận xét nào từ các thông số này?',
    options: [
      { key: 'A', text: 'Hai màn hình có cùng số điểm ảnh vì cùng 24 inch.' },
      { key: 'B', text: 'Thông số 24 inch cho biết tần số làm tươi.' },
      { key: 'C', text: 'Màn hình có độ phân giải cao hơn chắc chắn có đường chéo dài hơn.' },
      { key: 'D', text: 'Hai màn hình có cùng đường chéo nhưng khác số điểm ảnh.' },
    ],
    correctAnswer: 'D',
    explanation: 'Cả hai màn hình đều có kích thước vật lý là 24 inch (chiều dài đường chéo), nhưng màn hình 2560 × 1440 có mật độ điểm ảnh (pixels) cao hơn nhiều so với màn hình 1920 × 1080, giúp hiển thị chi tiết và sắc nét hơn.'
  },
  {
    id: 25,
    level: 'Hiểu',
    lesson: 'Bài 5: Kết nối thiết bị số',
    question: 'Máy in P có thông số 20 trang/phút, 600 dpi; máy in Q có thông số 15 trang/phút, 1200 dpi. Khi so sánh trong cùng điều kiện, nhận xét nào sau đây đúng?',
    options: [
      { key: 'A', text: 'Q nhanh hơn vì 1200 lớn hơn 600.' },
      { key: 'B', text: 'P có tốc độ danh định cao hơn; Q có độ phân giải danh định cao hơn.' },
      { key: 'C', text: 'Trang/phút và dpi cùng biểu thị một đại lượng.' },
      { key: 'D', text: 'P có độ phân giải cao hơn vì 20 lớn hơn 15.' },
    ],
    correctAnswer: 'B',
    explanation: 'Trang/phút (ppm) đo tốc độ in (P đạt 20 > Q đạt 15 nên P in nhanh hơn). Dpi (dots per inch) đo độ phân giải/độ sắc nét (Q đạt 1200 > P đạt 600 nên Q có độ phân giải cao hơn).'
  },
  {
    id: 26,
    level: 'Biết',
    lesson: 'Bài 5: Kết nối thiết bị số',
    question: 'Trong các thiết bị dưới đây, thiết bị nào vừa nhận thông tin từ người dùng, vừa hiển thị thông tin cho người dùng?',
    options: [
      { key: 'A', text: 'Máy in thông thường.' },
      { key: 'B', text: 'Màn hình cảm ứng.' },
      { key: 'C', text: 'Loa.' },
      { key: 'D', text: 'Bàn phím thông thường.' },
    ],
    correctAnswer: 'B',
    explanation: 'Màn hình cảm ứng (touch screen) là thiết bị kết hợp cả vào và ra: vừa hiển thị dữ liệu hình ảnh (output), vừa nhận thao tác chạm/vuốt của người dùng (input).'
  },
  {
    id: 27,
    level: 'Biết',
    lesson: 'Bài 6: Lưu trữ & chia sẻ trực tuyến',
    question: 'Lan đưa một tệp từ máy tính lên Google Drive để lưu trữ. Lan đang thực hiện thao tác nào sau đây?',
    options: [
      { key: 'A', text: 'Tải xuống.' },
      { key: 'B', text: 'Tạo thư mục.' },
      { key: 'C', text: 'Tải lên.' },
      { key: 'D', text: 'Tạo tệp.' },
    ],
    correctAnswer: 'C',
    explanation: 'Thao tác chuyển tệp từ thiết bị cục bộ lên máy chủ đám mây trực tuyến gọi là Tải lên (Upload).'
  },
  {
    id: 28,
    level: 'Hiểu',
    lesson: 'Bài 6: Lưu trữ & chia sẻ trực tuyến',
    question: 'Minh được cấp quyền nhận xét, còn Lan được cấp quyền chỉnh sửa một tài liệu Google Docs. Hai quyền này khác nhau như thế nào?',
    options: [
      { key: 'A', text: 'Quyền nhận xét tương đương quyền sở hữu.' },
      { key: 'B', text: 'Người có quyền nhận xét không thể đọc tài liệu.' },
      { key: 'C', text: 'Quyền nhận xét cho phép xóa mọi nội dung chính.' },
      { key: 'D', text: 'Quyền nhận xét cho phép góp ý, còn sửa nội dung chính cần quyền chỉnh sửa.' },
    ],
    correctAnswer: 'D',
    explanation: 'Quyền Nhận xét (Commenter) chỉ cho phép đọc và để lại lời bình/góp ý bên lề mà không trực tiếp sửa đổi văn bản gốc; còn Quyền Chỉnh sửa (Editor) cho phép can thiệp trực tiếp thêm, sửa, xóa nội dung tài liệu.'
  },
  {
    id: 29,
    level: 'Biết',
    lesson: 'Bài 8: Email & Mạng xã hội nâng cao',
    question: 'Minh nhập is:important vào ô tìm kiếm trong Gmail. Gmail sẽ tìm những thư nào cho Minh?',
    options: [
      { key: 'A', text: 'Thư đã bị xóa vĩnh viễn.' },
      { key: 'B', text: 'Thư được đánh dấu quan trọng.' },
      { key: 'C', text: 'Các thư trong hộp thư đến.' },
      { key: 'D', text: 'Chỉ các thư chưa gửi.' },
    ],
    correctAnswer: 'B',
    explanation: 'Cú pháp tìm kiếm `is:important` trên Gmail giúp lọc nhanh các email đã được hệ thống phân tích hoặc người dùng đánh dấu cờ quan trọng (Important marker).'
  },
  {
    id: 30,
    level: 'Hiểu',
    lesson: 'Bài 8: Email & Mạng xã hội nâng cao',
    question: 'Lan bật tính năng xem lại bài viết có gắn thẻ. Một bài chưa được Lan duyệt vẫn xuất hiện trên trang của người đăng. Vì sao điều này xảy ra?',
    options: [
      { key: 'A', text: 'Chưa duyệt thẻ đồng nghĩa mọi người đều không thể xem bài gốc.' },
      { key: 'B', text: 'Xem lại thẻ tự động xóa bài gốc sau khi duyệt.' },
      { key: 'C', text: 'Xem lại thẻ kiểm soát hiển thị, không xóa bài ở nơi đăng ban đầu.' },
      { key: 'D', text: 'Người đăng không còn quyền quản lí bài khi gắn thẻ.' },
    ],
    correctAnswer: 'C',
    explanation: 'Tính năng xem lại thẻ (Tag Review) chỉ cho phép người dùng kiểm soát việc bài viết đó có xuất hiện trên Dòng thời gian / Trang cá nhân của mình hay không, chứ không có quyền xóa bài đăng trên trang của tác giả gốc.'
  },
];

export const PART2_QUESTIONS: Part2Question[] = [
  {
    id: 1,
    title: 'Câu 1 (Bài 2: Thực hành sử dụng HĐH)',
    lesson: 'Bài 2: Thực hành sử dụng HĐH',
    context: 'An sắp xếp bài tập trên máy tính Windows. An cần chuyển tệp BaoCao.docx từ Downloads sang thư mục Tin11, đổi tên thành Bai2.docx và không để lại tệp cũ ở Downloads. Hãy xác định các nhận định sau là đúng hay sai.',
    items: [
      {
        key: 'a',
        text: 'File Explorer giúp người dùng quản lí các tệp và thư mục trên máy tính.',
        isCorrect: true,
        explanation: 'Đúng. File Explorer là trình quản lý tệp tin chính của hệ điều hành Windows.'
      },
      {
        key: 'b',
        text: 'Lệnh Rename dùng để thay đổi tên của tệp hoặc thư mục đã chọn.',
        isCorrect: true,
        explanation: 'Đúng. Rename (hoặc phím tắt F2) dùng để đổi tên tệp/thư mục.'
      },
      {
        key: 'c',
        text: 'Sao chép tệp sang Tin11 sẽ tự xóa tệp ban đầu trong Downloads.',
        isCorrect: false,
        explanation: 'Sai. Lệnh sao chép (Copy) chỉ nhân bản tệp, tệp gốc ở Downloads vẫn còn nguyên.'
      },
      {
        key: 'd',
        text: 'An có thể dùng Cut, Paste để chuyển tệp sang Tin11 rồi đổi tên thành Bai2.docx.',
        isCorrect: true,
        explanation: 'Đúng. Thao tác Cut (Cắt) và Paste (Dán) sẽ di chuyển tệp mà không lưu lại ở Downloads, sau đó Rename sang Bai2.docx hoàn toàn đáp ứng yêu cầu.'
      }
    ]
  },
  {
    id: 2,
    title: 'Câu 2 (Bài 3: Phần mềm nguồn mở & Internet)',
    lesson: 'Bài 3: Phần mềm nguồn mở & Internet',
    context: 'Mai cần soạn báo cáo khi không có Internet. Máy tính đã cài OpenOffice Writer và Mai muốn sử dụng phần mềm miễn phí. Hãy xác định các nhận định sau là đúng hay sai.',
    items: [
      {
        key: 'a',
        text: 'OpenOffice là bộ phần mềm văn phòng miễn phí và có mã nguồn mở.',
        isCorrect: true,
        explanation: 'Đúng. Apache OpenOffice là bộ phần mềm văn phòng mã nguồn mở và miễn phí hoàn toàn.'
      },
      {
        key: 'b',
        text: 'OpenOffice Writer có chức năng chính là tạo và chỉnh sửa bảng tính.',
        isCorrect: false,
        explanation: 'Sai. OpenOffice Writer là ứng dụng soạn thảo văn bản. Ứng dụng xử lý bảng tính là OpenOffice Calc.'
      },
      {
        key: 'c',
        text: 'Một phần mềm miễn phí chưa chắc đã cho phép người dùng sửa mã nguồn.',
        isCorrect: true,
        explanation: 'Đúng. Phần mềm miễn phí (freeware) có thể đóng mã nguồn và không cho phép can thiệp mã.'
      },
      {
        key: 'd',
        text: 'Mai có thể dùng Writer đã cài trên máy để soạn báo cáo trong tình huống này.',
        isCorrect: true,
        explanation: 'Đúng. Writer đã cài đặt cục bộ trên máy và hoạt động tốt offline không cần mạng Internet.'
      }
    ]
  },
  {
    id: 3,
    title: 'Câu 3 (Bài 5: Kết nối thiết bị số)',
    lesson: 'Bài 5: Kết nối thiết bị số',
    context: 'Bình dùng cáp VGA nối máy tính với tivi. Tivi hiển thị bài trình chiếu nhưng không nhận được âm thanh qua cáp này. Cả hai thiết bị đều có cổng HDMI. Hãy xác định các nhận định sau là đúng hay sai.',
    items: [
      {
        key: 'a',
        text: 'Cổng HDMI có thể truyền cả hình ảnh và âm thanh giữa các thiết bị.',
        isCorrect: true,
        explanation: 'Đúng. HDMI hỗ trợ truyền tải đồng thời tín hiệu hình ảnh kỹ thuật số độ nét cao và âm thanh đa kênh.'
      },
      {
        key: 'b',
        text: 'Cổng VGA truyền đồng thời tín hiệu hình ảnh và âm thanh đến tivi.',
        isCorrect: false,
        explanation: 'Sai. VGA chỉ là chuẩn truyền tín hiệu hình ảnh tương tự (analog), không truyền âm thanh.'
      },
      {
        key: 'c',
        text: 'Việc không có âm thanh qua cáp VGA chưa đủ để kết luận cáp bị hỏng.',
        isCorrect: true,
        explanation: 'Đúng. Bản chất chuẩn cáp VGA không mang tín hiệu âm thanh nên việc không có tiếng là đặc tính kĩ thuật chứ không phải do cáp hỏng.'
      },
      {
        key: 'd',
        text: 'Bình có thể dùng cáp HDMI thay cáp VGA và chọn nguồn HDMI tương ứng trên tivi.',
        isCorrect: true,
        explanation: 'Đúng. Nối bằng cáp HDMI sẽ đưa cả hình và tiếng lên tivi, chỉ cần chuyển nguồn vào (Input Source) của TV sang cổng HDMI tương ứng.'
      }
    ]
  },
  {
    id: 4,
    title: 'Câu 4 (Bài 8: Email & Mạng xã hội nâng cao)',
    lesson: 'Bài 8: Email & Mạng xã hội nâng cao',
    context: 'Lan nhận được lời mời kết bạn từ một tài khoản Facebook có tên và ảnh giống Minh. Lan thấy lạ vì trước đó hai bạn đã kết bạn với nhau. Hãy xác định các nhận định sau là đúng hay sai.',
    items: [
      {
        key: 'a',
        text: 'Người dùng có thể chấp nhận hoặc từ chối lời mời kết bạn trên Facebook.',
        isCorrect: true,
        explanation: 'Đúng. Người dùng hoàn toàn có quyền chủ động Đồng ý hoặc Xóa/Từ chối lời mời.'
      },
      {
        key: 'b',
        text: 'Chặn một tài khoản đồng nghĩa với việc chấp nhận lời mời kết bạn từ tài khoản đó.',
        isCorrect: false,
        explanation: 'Sai. Chặn (Block) ngăn mọi tương tác và hủy kết bạn, hoàn toàn trái ngược với chấp nhận kết bạn.'
      },
      {
        key: 'c',
        text: 'Tên và ảnh giống nhau chưa đủ để khẳng định tài khoản mới là của Minh.',
        isCorrect: true,
        explanation: 'Đúng. Kẻ xấu có thể dễ dàng sao chép ảnh đại diện và tên người khác để tạo tài khoản giả mạo lừa đảo.'
      },
      {
        key: 'd',
        text: 'Lan nên hỏi trực tiếp Minh trước khi quyết định chấp nhận lời mời kết bạn mới.',
        isCorrect: true,
        explanation: 'Đúng. Xác minh trực tiếp ngoài đời hoặc qua kênh liên lạc đáng tin cậy là biện pháp an toàn số quan trọng.'
      }
    ]
  },
  {
    id: 5,
    title: 'Câu 5 (Bài 7: Tìm kiếm thông tin Internet)',
    lesson: 'Bài 7: Tìm kiếm thông tin Internet',
    context: 'Hà tìm cách tiết kiệm điện trong phòng ở nội trú để chuẩn bị bài trình bày. Khi nhập từ khóa “tiết kiệm điện”, Hà nhận được nhiều bài viết về nhà máy. Hãy xác định các nhận định sau là đúng hay sai.',
    items: [
      {
        key: 'a',
        text: 'Người dùng có thể nhập từ khóa vào ô tìm kiếm để tìm thông tin trên Internet.',
        isCorrect: true,
        explanation: 'Đúng. Nhập từ khóa là cách cơ bản nhất để tra cứu trên mọi công cụ tìm kiếm.'
      },
      {
        key: 'b',
        text: 'Mục Hình ảnh trên trang kết quả dùng để tìm các hình ảnh liên quan đến từ khóa.',
        isCorrect: true,
        explanation: 'Đúng. Thẻ Hình ảnh (Images) lọc riêng các tệp đồ họa và ảnh.'
      },
      {
        key: 'c',
        text: 'Từ khóa quá chung có thể khiến kết quả bao gồm nhiều nội dung ngoài nhu cầu.',
        isCorrect: true,
        explanation: 'Đúng. "Tiết kiệm điện" là từ khóa chung nên máy tìm kiếm trả về cả công nghiệp, doanh nghiệp, nhà máy lẫn sinh hoạt.'
      },
      {
        key: 'd',
        text: 'Hà nên đổi từ khóa thành “tiết kiệm điện trong nhà máy” để tìm đúng nội dung cần chuẩn bị.',
        isCorrect: false,
        explanation: 'Sai. Nhu cầu của Hà là tìm cách tiết kiệm điện trong phòng nội trú/sinh hoạt gia đình chứ không phải nhà máy công nghiệp.'
      }
    ]
  },
  {
    id: 6,
    title: 'Câu 6 (Bài 8: Email & Mạng xã hội nâng cao)',
    lesson: 'Bài 8: Email & Mạng xã hội nâng cao',
    context: 'Minh thường nhận email giao bài Tin học qua Gmail. Minh muốn gom các thư này vào cùng một nhóm để tìm lại khi làm bài. Hãy xác định các nhận định sau là đúng hay sai.',
    items: [
      {
        key: 'a',
        text: 'Nhãn trong Gmail giúp người dùng phân loại và quản lí các thư đã nhận.',
        isCorrect: true,
        explanation: 'Đúng. Nhãn (Labels) cho phép gắn thẻ phân loại nội dung thư.'
      },
      {
        key: 'b',
        text: 'Gắn nhãn cho một email là thao tác gửi email đó trở lại cho người gửi.',
        isCorrect: false,
        explanation: 'Sai. Gắn nhãn chỉ là thao tác tổ chức thư trong hộp thư cá nhân, không gửi email đi.'
      },
      {
        key: 'c',
        text: 'Gắn nhãn Bài tập giúp Minh tìm lại các thư giao bài thuận tiện hơn.',
        isCorrect: true,
        explanation: 'Đúng. Minh chỉ cần nhấp vào nhãn Bài tập ở cột trái là thấy ngay tất cả thư giao bài.'
      },
      {
        key: 'd',
        text: 'Minh nên tạo nhãn Bài tập Tin học rồi gắn nhãn đó cho các thư giao bài của giáo viên.',
        isCorrect: true,
        explanation: 'Đúng. Đây là cách làm khoa học giúp tách bạch bài Tin học với các thư khác.'
      }
    ]
  }
];

export const PART3_QUESTIONS: Part3Question[] = [
  {
    id: 1,
    title: 'Câu 1 (1,0 điểm – Vận dụng: Phép toán nhị phân & Logic)',
    level: 'Vận dụng',
    lesson: 'Bài 4: Bên trong máy tính',
    context: 'Cho hai số nhị phân 1110₂ và 101₂. Em hãy thực hiện các yêu cầu sau:',
    subItems: [
      {
        key: 'a',
        question: 'Tính tổng của hai số và viết kết quả trong hệ nhị phân.',
        suggestedAnswer: '1110₂ + 101₂ = 10011₂.',
        points: 0.25
      },
      {
        key: 'b',
        question: 'Số nhị phân 1110₂ có giá trị bao nhiêu trong hệ thập phân?',
        suggestedAnswer: '1110₂ = 14₁₀.',
        points: 0.25
      },
      {
        key: 'c',
        question: 'x, y, z lần lượt có giá trị là 1, 1, 0 thì (x XOR y) OR z có giá trị bằng bao nhiêu?',
        suggestedAnswer: '(1 XOR 1) OR 0 có kết quả là 0',
        points: 0.25
      },
      {
        key: 'd',
        question: 'Số thập phân 124 biểu diễn dưới dạng nhị phân là số nào?',
        suggestedAnswer: '1111100',
        points: 0.25
      }
    ]
  },
  {
    id: 2,
    title: 'Câu 2 (1,0 điểm – Hiểu: Phân quyền chia sẻ tài liệu)',
    level: 'Hiểu',
    lesson: 'Bài 6: Lưu trữ & chia sẻ trực tuyến',
    context: 'Nhóm của Hoa soạn nội dung giới thiệu một món ăn truyền thống trên Google Docs. Hoa chia sẻ tài liệu cho các bạn để đọc, góp ý hoặc cùng viết. Em hãy trả lời:',
    subItems: [
      {
        key: 'a',
        question: 'Một bạn chỉ có quyền xem. Vì sao bạn đó không thể bổ sung tên nguyên liệu vào tài liệu?',
        suggestedAnswer: 'Quyền xem (Viewer) cho phép đọc nội dung nhưng không cho phép bổ sung, chỉnh sửa hoặc xóa nội dung trong tài liệu.',
        points: 0.25
      },
      {
        key: 'b',
        question: 'Người có quyền nhận xét và người có quyền chỉnh sửa khác nhau thế nào khi muốn sửa một câu viết chưa rõ?',
        suggestedAnswer: 'Người có quyền nhận xét chỉ ghi lời góp ý/đề xuất bên lề; người có quyền chỉnh sửa được trực tiếp sửa lại câu văn trong tài liệu.',
        points: 0.25
      },
      {
        key: 'c',
        question: 'Vì sao hai bạn có quyền chỉnh sửa có thể cùng hoàn thiện tài liệu mà không cần gửi từng bản cho nhau?',
        suggestedAnswer: 'Hai bạn cùng làm việc thời gian thực trên cùng một tài liệu lưu trữ đám mây; mọi thay đổi lập tức được đồng bộ và cập nhật tự động để cả hai cùng theo dõi.',
        points: 0.25
      },
      {
        key: 'd',
        question: 'Một bạn đã thêm nhận xét nhưng câu văn trong bài vẫn giữ nguyên. Em hãy giải thích vì sao.',
        suggestedAnswer: 'Nhận xét chỉ là lời ghi chú/góp ý bên cạnh, không tự động thay đổi nội dung câu văn cho đến khi người có quyền chỉnh sửa chấp thuận hoặc sửa trực tiếp.',
        points: 0.25
      }
    ]
  },
  {
    id: 3,
    title: 'Câu 3 (1,0 điểm – Vận dụng: Tìm kiếm & Đánh giá thông tin)',
    level: 'Vận dụng',
    lesson: 'Bài 7: Tìm kiếm thông tin Internet',
    context: 'Em chuẩn bị bài giới thiệu cách giảm rác thải nhựa trong khu nội trú. Em cần tìm thông tin và hình ảnh trên Internet. Hãy thực hiện các yêu cầu sau:',
    subItems: [
      {
        key: 'a',
        question: 'Viết các từ khóa em sẽ nhập để tìm những việc học sinh có thể làm nhằm giảm rác thải nhựa.',
        suggestedAnswer: 'Ví dụ: "việc học sinh có thể làm để giảm rác thải nhựa" hoặc "giảm rác thải nhựa trong học đường".',
        points: 0.25
      },
      {
        key: 'b',
        question: 'Kết quả có nhiều bài nói về xử lí rác ở nhà máy. Em hãy viết lại từ khóa để tìm những cách giảm rác nhựa trong sinh hoạt ở khu nội trú.',
        suggestedAnswer: 'Ví dụ: "cách giảm rác thải nhựa trong sinh hoạt ở khu nội trú" hoặc "giảm rác nhựa ký túc xá".',
        points: 0.25
      },
      {
        key: 'c',
        question: 'Em muốn tìm ảnh học sinh dùng bình nước cá nhân. Em sẽ nhập từ khóa nào và chọn mục nào trên trang kết quả?',
        suggestedAnswer: 'Nhập từ khóa "học sinh sử dụng bình nước cá nhân" và bấm chọn mục "Hình ảnh" (Images) trên thanh công cụ kết quả.',
        points: 0.25
      },
      {
        key: 'd',
        question: 'Em thấy một bài hướng dẫn của cơ quan môi trường và một bài đăng không ghi tác giả, nguồn thông tin. Em sẽ ưu tiên tham khảo bài nào? Vì sao?',
        suggestedAnswer: 'Ưu tiên bài của cơ quan môi trường vì có nguồn gốc xác thực, độ tin cậy và chuyên môn cao; tuy nhiên vẫn cần đọc và đối chiếu kiểm chứng nội dung.',
        points: 0.25
      }
    ]
  },
  {
    id: 4,
    title: 'Câu 4 (1,0 điểm – Vận dụng: Phép toán nhị phân & Logic)',
    level: 'Vận dụng',
    lesson: 'Bài 4: Bên trong máy tính',
    context: 'Cho hai số nhị phân 1001₂ và 111₂. Em hãy thực hiện các yêu cầu sau:',
    subItems: [
      {
        key: 'a',
        question: 'Cộng hai số trên và viết kết quả trong hệ nhị phân.',
        suggestedAnswer: '1001₂ + 111₂ = 10000₂.',
        points: 0.25
      },
      {
        key: 'b',
        question: 'Chuyển số 1001₂ sang hệ thập phân.',
        suggestedAnswer: '1001₂ = 9₁₀.',
        points: 0.25
      },
      {
        key: 'c',
        question: 'x, y, z lần lượt có giá trị là 0, 1, 1 thì (x XOR y) AND z có giá trị bằng bao nhiêu?',
        suggestedAnswer: '(0 XOR 1) AND 1 có kết quả là 1',
        points: 0.25
      },
      {
        key: 'd',
        question: 'Số thập phân 117 biểu diễn dưới dạng nhị phân là số nào?',
        suggestedAnswer: '1110101',
        points: 0.25
      }
    ]
  },
  {
    id: 5,
    title: 'Câu 5 (1,0 điểm – Hiểu: Quản lí tệp & Bảo mật lưu trữ đám mây)',
    level: 'Hiểu',
    lesson: 'Bài 6: Lưu trữ & chia sẻ trực tuyến',
    context: 'Hùng lưu lịch tập văn nghệ của lớp trên Google Drive. Hùng là chủ sở hữu và chỉ chia sẻ tài liệu cho những tài khoản được chỉ định. Em hãy trả lời:',
    subItems: [
      {
        key: 'a',
        question: 'Hùng cập nhật giờ tập trong tài liệu. Vì sao các bạn mở lại liên kết có thể xem lịch mới mà Hùng không cần gửi thêm một tệp khác?',
        suggestedAnswer: 'Vì liên kết dẫn trực tiếp tới tệp trực tuyến duy nhất trên máy chủ đám mây, mọi thay đổi Hùng lưu lại đều cập nhật tức thì trên tệp đó.',
        points: 0.25
      },
      {
        key: 'b',
        question: 'Một bạn chuyển liên kết cho người chưa được Hùng cấp quyền. Vì sao người đó vẫn không mở được lịch tập?',
        suggestedAnswer: 'Vì tài liệu được cài đặt ở chế độ chia sẻ giới hạn (chỉ tài khoản được chỉ định mới truy cập được); người có link nhưng không thuộc danh sách sẽ bị hệ thống từ chối.',
        points: 0.25
      },
      {
        key: 'c',
        question: 'Các bạn chỉ cần xem giờ tập. Việc cấp quyền chỉnh sửa cho tất cả các bạn có thể gây ra điều gì ngoài ý muốn?',
        suggestedAnswer: 'Các bạn có thể vô ý sửa sai, thay đổi nội dung hoặc xóa nhầm các thông tin quan trọng trong lịch tập.',
        points: 0.25
      },
      {
        key: 'd',
        question: 'Hùng đã thu hồi quyền truy cập của một tài khoản. Vì sao tài khoản đó không thể tiếp tục xem lịch bằng liên kết đã lưu?',
        suggestedAnswer: 'Vì quyền truy cập bị máy chủ thu hồi; liên kết lưu trên máy chỉ là đường dẫn, không thể thay thế quyền xác thực do chủ sở hữu cấp.',
        points: 0.25
      }
    ]
  },
  {
    id: 6,
    title: 'Câu 6 (1,0 điểm – Vận dụng: Xây dựng truy vấn & Chọn lọc thông tin)',
    level: 'Vận dụng',
    lesson: 'Bài 7: Tìm kiếm thông tin Internet',
    context: 'Em được giao giới thiệu cách sắp xếp góc học tập gọn gàng trong phòng ở nội trú. Em cần tìm bài viết và hình ảnh để minh họa. Hãy thực hiện các yêu cầu sau:',
    subItems: [
      {
        key: 'a',
        question: 'Em sẽ nhập những từ khóa nào để tìm cách sắp xếp góc học tập phù hợp với học sinh nội trú?',
        suggestedAnswer: 'Ví dụ: "cách sắp xếp góc học tập cho học sinh nội trú" hoặc "bố trí góc học tập gọn gàng phòng nội trú".',
        points: 0.25
      },
      {
        key: 'b',
        question: 'Kết quả có nhiều trang bán bàn ghế. Em hãy viết lại từ khóa để tập trung tìm bài hướng dẫn sắp xếp sách vở trên bàn học.',
        suggestedAnswer: 'Ví dụ: "hướng dẫn sắp xếp sách vở trên bàn học gọn gàng" hoặc "mẹo sắp xếp bàn học ngăn nắp".',
        points: 0.25
      },
      {
        key: 'c',
        question: 'Em muốn tìm ảnh minh họa bàn học được sắp xếp gọn gàng. Em sẽ nhập từ khóa nào và chọn mục nào trên trang kết quả?',
        suggestedAnswer: 'Nhập từ khóa "bàn học sắp xếp gọn gàng" và nhấp chọn tab "Hình ảnh" (Images) trên trang kết quả.',
        points: 0.25
      },
      {
        key: 'd',
        question: 'Em tìm được bài hướng dẫn trên website của một trường học và một bài quảng cáo khẳng định mua bàn mới sẽ giúp học giỏi ngay. Em sẽ ưu tiên dùng bài nào? Vì sao?',
        suggestedAnswer: 'Ưu tiên bài hướng dẫn của nhà trường vì xuất xứ uy tín, khách quan, phục vụ đúng mục đích giáo dục; quảng cáo thương mại mang tính thổi phồng thiếu căn cứ khoa học.',
        points: 0.25
      }
    ]
  }
];
