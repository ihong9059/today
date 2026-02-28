package com.sdcard.manager

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.storage.StorageManager
import android.os.storage.StorageVolume
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.InsertDriveFile
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.documentfile.provider.DocumentFile
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : ComponentActivity() {

    private var sdCardUri: Uri? = null
    private var sdCardRoot: DocumentFile? = null

    private val openDocumentTree = registerForActivityResult(
        ActivityResultContracts.OpenDocumentTree()
    ) { uri ->
        uri?.let {
            contentResolver.takePersistableUriPermission(
                it,
                Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION
            )
            sdCardUri = it
            sdCardRoot = DocumentFile.fromTreeUri(this, it)

            // 선택한 경로가 SD Card인지 확인
            val uriPath = it.toString()
            if (uriPath.contains("primary") || uriPath.contains("emulated")) {
                Toast.makeText(this, "내장 스토리지입니다. SD Card(4553-644E)를 선택해주세요.", Toast.LENGTH_LONG).show()
                // 내장 스토리지 선택 시 무시하고 다시 선택 요청
                sdCardUri = null
                sdCardRoot = null
                return@let
            } else {
                Toast.makeText(this, "SD Card가 선택되었습니다", Toast.LENGTH_SHORT).show()
                updateStorageInfo()
            }
            refreshFiles()
        }
    }

    private val _currentPath = mutableStateOf<DocumentFile?>(null)
    private val _files = mutableStateOf<List<FileItem>>(emptyList())
    private val _pathStack = mutableStateOf<List<DocumentFile>>(emptyList())
    private val _isLoading = mutableStateOf(false)
    private val _showCreateDialog = mutableStateOf(false)
    private val _showDeleteDialog = mutableStateOf(false)
    private val _selectedFile = mutableStateOf<FileItem?>(null)
    private val _showRenameDialog = mutableStateOf(false)

    // Storage Info
    private val _storageTotal = mutableStateOf(0L)
    private val _storageUsed = mutableStateOf(0L)
    private val _storageFree = mutableStateOf(0L)
    private val _sdCardVolumeId = mutableStateOf<String?>(null)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // SD Card 볼륨 찾기
        findSDCardVolume()

        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = Color(0xFF4CAF50),
                    secondary = Color(0xFF81C784),
                    background = Color(0xFF121212),
                    surface = Color(0xFF1E1E1E),
                    onPrimary = Color.White,
                    onSecondary = Color.White,
                    onBackground = Color.White,
                    onSurface = Color.White
                )
            ) {
                SDCardManagerApp()
            }
        }
    }

    private fun findSDCardVolume() {
        val storageManager = getSystemService(Context.STORAGE_SERVICE) as StorageManager
        val storageVolumes = storageManager.storageVolumes

        for (volume in storageVolumes) {
            if (volume.isRemovable) {
                _sdCardVolumeId.value = volume.uuid
                break
            }
        }
    }

    private fun updateStorageInfo() {
        sdCardUri?.let { uri ->
            try {
                val uriPath = uri.path ?: return

                // Storage Access Framework를 통해 용량 정보 가져오기
                val storageManager = getSystemService(Context.STORAGE_SERVICE) as StorageManager
                val storageVolumes = storageManager.storageVolumes

                for (volume in storageVolumes) {
                    if (volume.isRemovable && volume.state == "mounted") {
                        // SD Card 찾음 - 경로 기반으로 용량 계산
                        val sdPath = "/storage/${volume.uuid}"
                        val sdFile = File(sdPath)
                        if (sdFile.exists()) {
                            _storageTotal.value = sdFile.totalSpace
                            _storageFree.value = sdFile.freeSpace
                            _storageUsed.value = sdFile.totalSpace - sdFile.freeSpace
                        }
                        break
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    fun SDCardManagerApp() {
        val currentPath by _currentPath
        val files by _files
        val pathStack by _pathStack
        val isLoading by _isLoading
        val showCreateDialog by _showCreateDialog
        val showDeleteDialog by _showDeleteDialog
        val selectedFile by _selectedFile
        val showRenameDialog by _showRenameDialog

        var newFolderName by remember { mutableStateOf("") }
        var renameText by remember { mutableStateOf("") }

        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Column {
                            Text("SD Card Manager", fontWeight = FontWeight.Bold)
                            Text(
                                text = if (currentPath != null) {
                                    buildPathString()
                                } else {
                                    "SD Card 선택 필요"
                                },
                                fontSize = 12.sp,
                                color = Color.Gray,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                    },
                    navigationIcon = {
                        if (pathStack.isNotEmpty()) {
                            IconButton(onClick = { navigateBack() }) {
                                Icon(Icons.AutoMirrored.Filled.ArrowBack, "뒤로")
                            }
                        }
                    },
                    actions = {
                        IconButton(onClick = { refreshFiles() }) {
                            Icon(Icons.Default.Refresh, "새로고침")
                        }
                        IconButton(onClick = { selectSDCard() }) {
                            Icon(Icons.Default.SdCard, "SD Card 선택")
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = Color(0xFF1E1E1E)
                    )
                )
            },
            floatingActionButton = {
                if (currentPath != null) {
                    FloatingActionButton(
                        onClick = { _showCreateDialog.value = true },
                        containerColor = Color(0xFF4CAF50)
                    ) {
                        Icon(Icons.Default.CreateNewFolder, "새 폴더")
                    }
                }
            }
        ) { padding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .background(Color(0xFF121212))
            ) {
                // Storage Info Card with Capacity
                if (sdCardRoot != null) {
                    StorageInfoCard()
                }

                // File List
                if (currentPath == null) {
                    EmptyState()
                } else if (isLoading) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator(color = Color(0xFF4CAF50))
                    }
                } else if (files.isEmpty()) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(
                                Icons.Default.FolderOpen,
                                contentDescription = null,
                                modifier = Modifier.size(64.dp),
                                tint = Color.Gray
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text("빈 폴더입니다", color = Color.Gray, fontSize = 16.sp)
                        }
                    }
                } else {
                    LazyColumn(
                        modifier = Modifier.fillMaxSize(),
                        contentPadding = PaddingValues(8.dp)
                    ) {
                        items(files) { file ->
                            FileItemCard(
                                file = file,
                                onClick = {
                                    if (file.isDirectory) {
                                        navigateToFolder(file.documentFile)
                                    }
                                },
                                onDelete = {
                                    _selectedFile.value = file
                                    _showDeleteDialog.value = true
                                },
                                onRename = {
                                    _selectedFile.value = file
                                    renameText = file.name
                                    _showRenameDialog.value = true
                                }
                            )
                        }
                    }
                }
            }
        }

        // Create Folder Dialog
        if (showCreateDialog) {
            AlertDialog(
                onDismissRequest = {
                    _showCreateDialog.value = false
                    newFolderName = ""
                },
                title = { Text("새 폴더 만들기") },
                text = {
                    OutlinedTextField(
                        value = newFolderName,
                        onValueChange = { newFolderName = it },
                        label = { Text("폴더 이름") },
                        singleLine = true
                    )
                },
                confirmButton = {
                    TextButton(
                        onClick = {
                            if (newFolderName.isNotBlank()) {
                                createFolder(newFolderName)
                                _showCreateDialog.value = false
                                newFolderName = ""
                            }
                        }
                    ) {
                        Text("만들기")
                    }
                },
                dismissButton = {
                    TextButton(onClick = {
                        _showCreateDialog.value = false
                        newFolderName = ""
                    }) {
                        Text("취소")
                    }
                }
            )
        }

        // Delete Confirmation Dialog
        if (showDeleteDialog && selectedFile != null) {
            AlertDialog(
                onDismissRequest = { _showDeleteDialog.value = false },
                title = { Text("삭제 확인") },
                text = {
                    Text("'${selectedFile!!.name}'을(를) 삭제하시겠습니까?")
                },
                confirmButton = {
                    TextButton(
                        onClick = {
                            deleteFile(selectedFile!!.documentFile)
                            _showDeleteDialog.value = false
                            _selectedFile.value = null
                        }
                    ) {
                        Text("삭제", color = Color.Red)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { _showDeleteDialog.value = false }) {
                        Text("취소")
                    }
                }
            )
        }

        // Rename Dialog
        if (showRenameDialog && selectedFile != null) {
            AlertDialog(
                onDismissRequest = {
                    _showRenameDialog.value = false
                    _selectedFile.value = null
                },
                title = { Text("이름 변경") },
                text = {
                    OutlinedTextField(
                        value = renameText,
                        onValueChange = { renameText = it },
                        label = { Text("새 이름") },
                        singleLine = true
                    )
                },
                confirmButton = {
                    TextButton(
                        onClick = {
                            if (renameText.isNotBlank()) {
                                renameFile(selectedFile!!.documentFile, renameText)
                                _showRenameDialog.value = false
                                _selectedFile.value = null
                            }
                        }
                    ) {
                        Text("변경")
                    }
                },
                dismissButton = {
                    TextButton(onClick = {
                        _showRenameDialog.value = false
                        _selectedFile.value = null
                    }) {
                        Text("취소")
                    }
                }
            )
        }
    }

    private fun buildPathString(): String {
        val pathStack = _pathStack.value
        val current = _currentPath.value

        val pathNames = mutableListOf<String>()
        pathStack.forEach { doc ->
            doc.name?.let { pathNames.add(it) }
        }
        current?.name?.let { pathNames.add(it) }

        return if (pathNames.isEmpty()) {
            "SD Card"
        } else {
            "SD Card / " + pathNames.joinToString(" / ")
        }
    }

    @Composable
    fun StorageInfoCard() {
        val storageTotal by _storageTotal
        val storageUsed by _storageUsed
        val storageFree by _storageFree

        val usagePercent = if (storageTotal > 0) {
            (storageUsed.toFloat() / storageTotal.toFloat())
        } else 0f

        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF2E2E2E))
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.SdCard,
                        contentDescription = null,
                        tint = Color(0xFF4CAF50),
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            "SD Card",
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp,
                            color = Color.White
                        )
                        if (storageTotal > 0) {
                            Text(
                                "${formatFileSize(storageUsed)} / ${formatFileSize(storageTotal)} 사용",
                                fontSize = 14.sp,
                                color = Color.Gray
                            )
                        } else {
                            Text(
                                sdCardUri?.lastPathSegment ?: "External Storage",
                                fontSize = 12.sp,
                                color = Color.Gray
                            )
                        }
                    }
                }

                if (storageTotal > 0) {
                    Spacer(modifier = Modifier.height(12.dp))

                    // Progress Bar
                    LinearProgressIndicator(
                        progress = usagePercent,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(8.dp),
                        color = when {
                            usagePercent > 0.9f -> Color(0xFFE53935)
                            usagePercent > 0.7f -> Color(0xFFFFB300)
                            else -> Color(0xFF4CAF50)
                        },
                        trackColor = Color(0xFF424242),
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    // Storage Details
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text("사용됨", fontSize = 11.sp, color = Color.Gray)
                            Text(
                                formatFileSize(storageUsed),
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Medium,
                                color = Color.White
                            )
                        }
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("전체", fontSize = 11.sp, color = Color.Gray)
                            Text(
                                formatFileSize(storageTotal),
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Medium,
                                color = Color.White
                            )
                        }
                        Column(horizontalAlignment = Alignment.End) {
                            Text("여유 공간", fontSize = 11.sp, color = Color.Gray)
                            Text(
                                formatFileSize(storageFree),
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Medium,
                                color = Color(0xFF4CAF50)
                            )
                        }
                    }
                }
            }
        }
    }

    @Composable
    fun EmptyState() {
        val sdCardVolumeId by _sdCardVolumeId

        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.padding(32.dp)
            ) {
                Icon(
                    Icons.Default.SdCard,
                    contentDescription = null,
                    modifier = Modifier.size(80.dp),
                    tint = Color.Gray
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    "SD Card를 선택해주세요",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Spacer(modifier = Modifier.height(8.dp))

                if (sdCardVolumeId != null) {
                    Text(
                        "SD Card 감지됨: $sdCardVolumeId",
                        fontSize = 14.sp,
                        color = Color(0xFF4CAF50)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                }

                Text(
                    "아래 버튼을 눌러 SD Card 폴더를 선택하세요.\n내장 스토리지가 아닌 SD Card를 선택해주세요.",
                    fontSize = 14.sp,
                    color = Color.Gray,
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
                Spacer(modifier = Modifier.height(24.dp))
                Button(
                    onClick = { selectSDCard() },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF4CAF50)
                    ),
                    modifier = Modifier.fillMaxWidth(0.7f)
                ) {
                    Icon(Icons.Default.FolderOpen, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("SD Card 선택", fontSize = 16.sp)
                }
            }
        }
    }

    @Composable
    fun FileItemCard(
        file: FileItem,
        onClick: () -> Unit,
        onDelete: () -> Unit,
        onRename: () -> Unit
    ) {
        var expanded by remember { mutableStateOf(false) }

        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp)
                .clickable { onClick() },
            colors = CardDefaults.cardColors(containerColor = Color(0xFF2E2E2E)),
            shape = RoundedCornerShape(8.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Icon
                Icon(
                    imageVector = if (file.isDirectory) Icons.Default.Folder else Icons.AutoMirrored.Filled.InsertDriveFile,
                    contentDescription = null,
                    tint = if (file.isDirectory) Color(0xFFFFCA28) else Color(0xFF90CAF9),
                    modifier = Modifier.size(40.dp)
                )

                Spacer(modifier = Modifier.width(12.dp))

                // File Info
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = file.name,
                        fontWeight = FontWeight.Medium,
                        color = Color.White,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                    Row {
                        Text(
                            text = if (file.isDirectory) "폴더" else formatFileSize(file.size),
                            fontSize = 12.sp,
                            color = Color.Gray
                        )
                        if (file.lastModified > 0) {
                            Text(
                                text = " • ${formatDate(file.lastModified)}",
                                fontSize = 12.sp,
                                color = Color.Gray
                            )
                        }
                    }
                }

                // Menu
                Box {
                    IconButton(onClick = { expanded = true }) {
                        Icon(Icons.Default.MoreVert, "메뉴", tint = Color.Gray)
                    }
                    DropdownMenu(
                        expanded = expanded,
                        onDismissRequest = { expanded = false }
                    ) {
                        DropdownMenuItem(
                            text = { Text("이름 변경") },
                            onClick = {
                                expanded = false
                                onRename()
                            },
                            leadingIcon = { Icon(Icons.Default.Edit, null) }
                        )
                        DropdownMenuItem(
                            text = { Text("삭제", color = Color.Red) },
                            onClick = {
                                expanded = false
                                onDelete()
                            },
                            leadingIcon = { Icon(Icons.Default.Delete, null, tint = Color.Red) }
                        )
                    }
                }
            }
        }
    }

    private fun selectSDCard() {
        val storageManager = getSystemService(Context.STORAGE_SERVICE) as StorageManager

        // SD Card의 Intent 생성 시도
        try {
            val volumes = storageManager.storageVolumes
            for (volume in volumes) {
                if (volume.isRemovable && volume.uuid != null) {
                    // SD Card용 Intent 생성 - SD Card 루트로 직접 이동
                    val intent = volume.createOpenDocumentTreeIntent()

                    // URI를 SD Card 루트로 설정
                    val uri = intent.getParcelableExtra<Uri>("android.provider.extra.INITIAL_URI")
                    val scheme = uri.toString()
                    val sdCardUri = scheme.replace("/root/", "/document/") + "%3A"

                    intent.putExtra("android.provider.extra.INITIAL_URI", Uri.parse(sdCardUri))
                    openDocumentTree.launch(Uri.parse(sdCardUri))
                    return
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

        // 폴백: 일반 document tree 선택
        openDocumentTree.launch(null)
    }

    private fun refreshFiles() {
        val current = _currentPath.value ?: sdCardRoot
        current?.let { loadFiles(it) }
        updateStorageInfo()
    }

    private fun loadFiles(folder: DocumentFile) {
        _isLoading.value = true
        _currentPath.value = folder

        Thread {
            val fileList = folder.listFiles()
                .filter { it.name != null }
                .map { file ->
                    FileItem(
                        name = file.name ?: "Unknown",
                        isDirectory = file.isDirectory,
                        size = if (file.isFile) file.length() else 0L,
                        lastModified = file.lastModified(),
                        documentFile = file
                    )
                }
                .sortedWith(compareBy({ !it.isDirectory }, { it.name.lowercase() }))

            runOnUiThread {
                _files.value = fileList
                _isLoading.value = false
            }
        }.start()
    }

    private fun navigateToFolder(folder: DocumentFile) {
        _currentPath.value?.let { current ->
            _pathStack.value = _pathStack.value + current
        }
        loadFiles(folder)
    }

    private fun navigateBack() {
        val stack = _pathStack.value
        if (stack.isNotEmpty()) {
            val parent = stack.last()
            _pathStack.value = stack.dropLast(1)
            loadFiles(parent)
        }
    }

    private fun createFolder(name: String) {
        _currentPath.value?.let { current ->
            val newFolder = current.createDirectory(name)
            if (newFolder != null) {
                Toast.makeText(this, "'$name' 폴더가 생성되었습니다", Toast.LENGTH_SHORT).show()
                refreshFiles()
            } else {
                Toast.makeText(this, "폴더 생성 실패", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun deleteFile(file: DocumentFile) {
        val name = file.name
        if (file.delete()) {
            Toast.makeText(this, "'$name' 삭제됨", Toast.LENGTH_SHORT).show()
            refreshFiles()
        } else {
            Toast.makeText(this, "삭제 실패", Toast.LENGTH_SHORT).show()
        }
    }

    private fun renameFile(file: DocumentFile, newName: String) {
        if (file.renameTo(newName)) {
            Toast.makeText(this, "이름이 변경되었습니다", Toast.LENGTH_SHORT).show()
            refreshFiles()
        } else {
            Toast.makeText(this, "이름 변경 실패", Toast.LENGTH_SHORT).show()
        }
    }

    private fun formatFileSize(size: Long): String {
        return when {
            size < 1024 -> "$size B"
            size < 1024 * 1024 -> String.format("%.1f KB", size / 1024.0)
            size < 1024 * 1024 * 1024 -> String.format("%.1f MB", size / (1024.0 * 1024))
            else -> String.format("%.2f GB", size / (1024.0 * 1024 * 1024))
        }
    }

    private fun formatDate(timestamp: Long): String {
        val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault())
        return sdf.format(Date(timestamp))
    }
}

data class FileItem(
    val name: String,
    val isDirectory: Boolean,
    val size: Long,
    val lastModified: Long,
    val documentFile: DocumentFile
)
